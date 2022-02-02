import { useCallback, useEffect, useState } from 'react';

import { contracts } from 'config';
import { erc20Abi, VaultAbi } from 'config/abi';

import { useWalletConnectorContext } from 'services';
import { TokensInfoI } from 'types';

const { params, type } = contracts;

export const useGetTokensInfo = (vaultAddress: string): TokensInfoI => {
  const { walletService } = useWalletConnectorContext();

  const [tokensInfo, setTokensInfo] = useState<TokensInfoI>({
    address0: '',
    address1: '',
    symbol0: '',
    symbol1: '',
    balance0: '',
    balance1: '',
  });

  const getPoolData = useCallback(async () => {
    const contract = walletService.connectWallet.getContract({
      address: vaultAddress,
      abi: params.Vault[type].abi,
    });
    const address0 = await contract.methods.token0().call();
    const address1 = await contract.methods.token1().call();
    const symbol0 = await walletService.getTokenSymbol(address0, erc20Abi);
    const symbol1 = await walletService.getTokenSymbol(address1, erc20Abi);
    const balance0 = await walletService.getFirstTokenBalance(vaultAddress, VaultAbi);
    const balance1 = await walletService.getSecondTokenBalance(vaultAddress, VaultAbi);
    const pool = {
      address0,
      address1,
      symbol0,
      symbol1,
      balance0,
      balance1,
    };

    setTokensInfo(pool);
  }, [vaultAddress, walletService]);

  useEffect(() => {
    getPoolData();
  }, [getPoolData]);

  return tokensInfo;
};
