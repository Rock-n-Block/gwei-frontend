import { useCallback, useEffect, useState } from 'react';

import { contracts } from 'config';
import { MockToken1Abi, MockToken2Abi, VaultAbi } from 'config/abi';

import { useWalletConnectorContext } from 'services';
import { TokensInfoI } from 'types';

const { params, type } = contracts;

export const useGetTokensInfo = (): TokensInfoI => {
  const { walletService } = useWalletConnectorContext();

  const [tokensInfo, setTokensInfo] = useState<TokensInfoI>({
    symbol0: '',
    symbol1: '',
    balance0: '',
    balance1: '',
  });

  const getPoolData = useCallback(async () => {
    const symbol0 = await walletService.getTokenSymbol(
      params.MockToken1[type].address,
      MockToken1Abi,
    );
    const symbol1 = await walletService.getTokenSymbol(
      params.MockToken2[type].address,
      MockToken2Abi,
    );
    const balance0 = await walletService.getFirstTokenBalance(params.Vault[type].address, VaultAbi);
    const balance1 = await walletService.getSecondTokenBalance(
      params.Vault[type].address,
      VaultAbi,
    );
    const pool = {
      symbol0,
      symbol1,
      balance0,
      balance1,
    };

    setTokensInfo(pool);
  }, [walletService]);

  useEffect(() => {
    getPoolData();
  }, [getPoolData]);

  return tokensInfo;
};
