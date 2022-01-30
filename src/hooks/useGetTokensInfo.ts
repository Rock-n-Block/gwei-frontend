import { useCallback, useEffect, useState } from 'react';

import { TOKEN1_ADDRESS, TOKEN2_ADDRESS, VAULT_ADDRESS } from 'config';
import { MockToken1Abi, MockToken2Abi, VaultAbi } from 'config/abi';

import { useWalletConnectorContext } from 'services';

interface TokensInfoI {
  symbol: string;
  balance: string;
}

type TokensInfoT = TokensInfoI[];

export const useGetTokensInfo = (): TokensInfoT => {
  const { walletService } = useWalletConnectorContext();

  const [tokensInfo, setTokensInfo] = useState<TokensInfoT>([
    {
      symbol: '',
      balance: '',
    },
    {
      symbol: '',
      balance: '',
    },
  ]);

  const getToken1Symbol = useCallback(
    () => walletService.getTokenSymbol(TOKEN1_ADDRESS, MockToken1Abi),
    [walletService],
  );
  const getToken2Symbol = useCallback(
    () => walletService.getTokenSymbol(TOKEN2_ADDRESS, MockToken2Abi),
    [walletService],
  );
  const getFirstTokenBalance = useCallback(
    () => walletService.getFirstTokenBalance(VAULT_ADDRESS, VaultAbi),
    [walletService],
  );
  const getSecondTokenBalance = useCallback(
    () => walletService.getSecondTokenBalance(VAULT_ADDRESS, VaultAbi),
    [walletService],
  );

  useEffect(() => {
    getToken1Symbol().then((symbol) => {
      setTokensInfo([...tokensInfo, (tokensInfo[0].symbol = symbol)]);
    });
    getToken2Symbol().then((symbol) => {
      setTokensInfo([...tokensInfo, (tokensInfo[1].symbol = symbol)]);
    });
    getFirstTokenBalance().then((balance) => {
      setTokensInfo([...tokensInfo, (tokensInfo[0].balance = balance)]);
    });
    getSecondTokenBalance().then((balance) => {
      setTokensInfo([...tokensInfo, (tokensInfo[1].balance = balance)]);
    });
  }, []);

  return tokensInfo;
};
