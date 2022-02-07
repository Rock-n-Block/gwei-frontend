import { ConnectWallet } from '@amfi/connect-wallet';
import { IConnect, IError } from '@amfi/connect-wallet/dist/interface';
import BigNumber from 'bignumber.js/bignumber';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

import { connectWallet as connectWalletConfig, contracts } from 'config';
import { erc20Abi, VaultAbi } from 'config/abi';
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

  public async getEthBalance(address: string): Promise<string> {
    const balance = await this.Web3().eth.getBalance(address);
    return new BigNumber(balance).div(10 ** 18).toString(10);
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

  static getMethodInterface(abi: Array<AbiItem>, methodName: string) {
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

  async checkTokenAllowance({
    contractAddress,
    contractAbi,
    approvedAddress,
    walletAddress,
    amount,
  }: {
    contractAddress: string;
    contractAbi: AbiItem[];
    approvedAddress?: string;
    walletAddress?: string;
    amount?: string | number;
  }): Promise<boolean> {
    try {
      const contract = this.connectWallet.getContract({
        address: contractAddress,
        abi: contractAbi,
      });
      const walletAdr = walletAddress || this.walletAddress;

      let result = await contract.methods
        .allowance(walletAdr, approvedAddress || contractAddress)
        .call();

      const tokenDecimals = await this.getTokenDecimals(contractAddress);

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
    contractAddress,
    contractAbi,
    amountToApprove,
    approvedAddress,
    walletAddress,
  }: {
    contractAddress: string;
    contractAbi: AbiItem[];
    amountToApprove: string;
    approvedAddress?: string;
    walletAddress?: string;
  }) {
    try {
      const approveMethod = WalletService.getMethodInterface(contractAbi, 'approve');

      const approveSignature = this.encodeFunctionCall(approveMethod, [
        approvedAddress || walletAddress || this.walletAddress,
        await this.ethToWei(contractAddress, amountToApprove),
      ]);

      return this.sendTransaction({
        from: walletAddress || this.walletAddress,
        to: contractAddress,
        data: approveSignature,
      });
    } catch (error) {
      return error;
    }
  }

  public async deposit({
    vaultAddress,
    address0,
    address1,
    amount0,
    amount1,
    walletAddress,
  }: {
    vaultAddress: string;
    address0: string;
    address1: string;
    amount0: string;
    amount1: string;
    walletAddress: string;
  }): Promise<unknown> {
    const amount0Desired = await this.ethToWei(address0, amount0);
    const amount1Desired = await this.ethToWei(address1, amount1);
    const amount0Min = new BigNumber(amount0Desired).div(10).times(8).toFixed(0, 1);
    const amount1Min = new BigNumber(amount1Desired).div(10).times(8).toFixed(0, 1);
    const contract = this.connectWallet.getContract({
      address: vaultAddress,
      abi: VaultAbi as AbiItem[],
    });
    return contract.methods
      .deposit(amount0Desired, amount1Desired, amount0Min, amount1Min, walletAddress)
      .send({
        from: walletAddress,
      });
  }

  public async withdraw({
    vaultAddress,
    shares,
    amount0Min,
    amount1Min,
    walletAddress,
  }: {
    vaultAddress: string;
    shares: string;
    amount0Min: string;
    amount1Min: string;
    walletAddress: string;
  }): Promise<unknown> {
    const contract = this.connectWallet.getContract({
      address: vaultAddress,
      abi: VaultAbi as AbiItem[],
    });
    return contract.methods
      .withdraw(shares, amount0Min, amount1Min, walletAddress)
      .send({ from: walletAddress });
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
    return new BigNumber(amount).multipliedBy(new BigNumber(10).pow(tokenDecimals)).toFixed(0, 1);
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
