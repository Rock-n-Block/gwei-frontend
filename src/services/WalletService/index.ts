import { ConnectWallet } from '@amfi/connect-wallet';
import { IConnect, IError } from '@amfi/connect-wallet/dist/interface';
import BigNumber from 'bignumber.js/bignumber';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

import { connectWallet as connectWalletConfig, contracts } from 'config';
import { erc20Abi } from 'config/abi';
import { clog } from 'utils/logger';

import { chainsEnum, WalletT } from 'types';

type TokenAbiType = {
  [key in chainsEnum]: Array<AbiItem>;
};

const tokenAbis: TokenAbiType = {
  Ethereum: erc20Abi as Array<AbiItem>,
};

const log = (...content: unknown[]) => clog('services/WalletService[debug]:', ...content);

export class WalletService {
  public connectWallet: ConnectWallet;

  public walletAddress = '';

  public web3: any = '';

  public contracts: any = {};

  private currentChain: chainsEnum = chainsEnum.Ethereum;

  constructor(initProvider?: any) {
    this.connectWallet = new ConnectWallet(initProvider);
    this.web3 = this.connectWallet.currentWeb3();
  }

  public async initWalletConnect(
    chainName: chainsEnum,
    providerName: WalletT, // ADD PROVIDERS HERE
  ): Promise<boolean> {
    return new Promise((resolve) => {
      const { provider, network, settings } = connectWalletConfig(chainName);
      log('chainName: ', chainName);

      const connecting = this.connectWallet
        .connect(provider[providerName], network, settings)
        .then((connected: boolean | {}) => {
          this.currentChain = chainName;
          return connected;
        })
        .catch(() => {});

      Promise.all([connecting]).then((connect: any) => {
        resolve(connect[0]);
      });
    });
  }

  public logOut(): void {
    this.connectWallet.resetConect();
  }

  public Web3(): Web3 {
    return this.connectWallet.currentWeb3();
  }

  public getTokenBalance(address: string, abi?: AbiItem[]): Promise<string> {
    const contract = this.connectWallet.getContract({
      address,
      abi: abi ?? tokenAbis[this.currentChain],
    });
    const balance = contract.methods.balanceOf(this.walletAddress).call();

    return this.weiToEth(address, balance);
  }

  public getTokenDecimals(address: string): Promise<string> {
    const contract = this.connectWallet.getContract({
      address,
      abi: tokenAbis[this.currentChain],
    });

    return contract.methods.decimals().call();
  }

  public setAccountAddress(address: string) {
    this.walletAddress = address;
  }

  public getAccount(): Promise<
    | IConnect
    | IError
    | {
        address: string;
      }
  > {
    return this.connectWallet.getAccounts();
  }

  static getMethodInterface(abi: Array<any>, methodName: string) {
    return abi.filter((m) => {
      return m.name === methodName;
    })[0];
  }

  encodeFunctionCall(abi: any, data: Array<any>) {
    return this.Web3().eth.abi.encodeFunctionCall(abi, data);
  }

  async createTransaction({
    method,
    data,
    contract,
    tx,
    to,
    walletAddress,
    value,
  }: {
    method: string;
    data: Array<any>;
    contract: 'BOND';
    tx?: any;
    to?: string;
    walletAddress?: string;
    value?: any;
  }) {
    const transactionMethod = WalletService.getMethodInterface(
      contracts.params[contract][contracts.type].abi,
      method,
    );

    let signature;
    if (transactionMethod) {
      signature = this.encodeFunctionCall(transactionMethod, data);
    }

    if (tx) {
      tx.from = walletAddress || this.walletAddress;
      tx.data = signature;

      return this.sendTransaction(tx);
    }
    return this.sendTransaction({
      from: walletAddress || this.walletAddress,
      to: to || contracts.params[contract][contracts.type].address,
      data: signature || '',
      value: value || '',
    });
  }

  sendTransaction(transactionConfig: any) {
    return this.Web3().eth.sendTransaction({
      ...transactionConfig,
      from: this.walletAddress,
    });
  }

  async getTotalSupply(tokenAddress: string, abi: Array<any>) {
    const contract = this.connectWallet.getContract({ address: tokenAddress, abi });
    const totalSupply = await contract.methods.totalSupply().call();

    return this.weiToEth(tokenAddress, totalSupply);
  }

  async getMaxTotalSupply(tokenAddress: string, abi: Array<any>) {
    const contract = this.connectWallet.getContract({ address: tokenAddress, abi });
    const maxTotalSupply = await contract.methods.maxTotalSupply().call();

    return this.weiToEth(tokenAddress, maxTotalSupply);
  }

  async getTokenSymbol(tokenAddress: string, abi: Array<any>) {
    const contract = this.connectWallet.getContract({ address: tokenAddress, abi });
    return contract.methods.symbol().call();
  }

  async getFirstTokenBalance(tokenAddress: string, abi: Array<any>) {
    const contract = this.connectWallet.getContract({ address: tokenAddress, abi });
    const balance = await contract.methods.getBalance0().call();

    return this.weiToEth(tokenAddress, balance);
  }

  async getSecondTokenBalance(tokenAddress: string, abi: Array<any>) {
    const contract = this.connectWallet.getContract({ address: tokenAddress, abi });
    const balance = await contract.methods.getBalance1().call();

    return this.weiToEth(tokenAddress, balance);
  }

  async checkTokenAllowance({
    contractName,
    approvedAddress,
    walletAddress,
    amount,
  }: {
    contractName: string;
    approvedAddress?: string;
    walletAddress?: string;
    amount?: string | number;
  }): Promise<boolean> {
    try {
      const contract = this.connectWallet.getContract({
        address: contracts.params[contractName][contracts.type].address,
        abi: contracts.params[contractName][contracts.type].abi,
      });
      const walletAdr = walletAddress || this.walletAddress;

      let result = await contract.methods
        .allowance(
          walletAdr,
          approvedAddress || contracts.params[contractName][contracts.type].address,
        )
        .call();

      const tokenDecimals = await this.getTokenDecimals(
        contracts.params[contractName][contracts.type].address,
      );

      result =
        result === '0'
          ? null
          : +new BigNumber(result).dividedBy(new BigNumber(10).pow(tokenDecimals)).toString(10);
      return !!(result && new BigNumber(result).minus(amount || 0).isPositive());
    } catch (error) {
      return false;
    }
  }

  async approveToken({
    contractName,
    amountToApprove,
    approvedAddress,
    walletAddress,
  }: {
    contractName: string;
    amountToApprove: string;
    approvedAddress?: string;
    walletAddress?: string;
  }) {
    try {
      const approveMethod = WalletService.getMethodInterface(
        contracts.params[contractName][contracts.type].abi,
        'approve',
      );

      const approveSignature = this.encodeFunctionCall(approveMethod, [
        approvedAddress || walletAddress || this.walletAddress,
        amountToApprove,
      ]);

      return this.sendTransaction({
        from: walletAddress || this.walletAddress,
        to: contracts.params[contractName][contracts.type].address,
        data: approveSignature,
      });
    } catch (error) {
      return error;
    }
  }

  public async weiToEth(tokenContract: string, amount: number | string): Promise<string> {
    if (amount === '0') {
      return amount;
    }
    const tokenDecimals = await this.getTokenDecimals(tokenContract);
    return new BigNumber(amount).dividedBy(new BigNumber(10).pow(tokenDecimals)).toString(10);
  }

  public async ethToWei(tokenContract: string, amount: number | string): Promise<string> {
    if (amount === '0') {
      return amount;
    }
    const tokenDecimals = await this.getTokenDecimals(tokenContract);
    return new BigNumber(amount).multipliedBy(new BigNumber(10).pow(tokenDecimals)).toString(10);
  }

  static getAddress(contractName: string): string {
    return contracts.params[contractName][contracts.type].address;
  }

  createContract(contractName: string, tokenAddress: string, abi: Array<any>) {
    if (!this.contracts[contractName]) {
      const contract = this.connectWallet.getContract({ address: tokenAddress, abi });
      this.contracts = {
        ...this.contracts,
        [contractName]: contract,
      };
    }
  }

  async callContractMethod({
    contractName,
    methodName,
    data = [],
    contractAddress,
    contractAbi,
  }: {
    contractName: string;
    methodName: string;
    data?: any[];
    contractAddress: string;
    contractAbi: Array<any>;
  }) {
    try {
      if (!this.contracts[contractName] && contractAddress && contractAbi) {
        this.createContract(contractName, contractAddress, contractAbi);
      }

      if (this.contracts[contractName]) {
        const method = this.contracts[contractName].methods[methodName];
        return method(...data).call();
      }
    } catch (err: any) {
      throw new Error(err);
    }
    return new Error(`contract ${contractName} didn't created`);
  }
}
