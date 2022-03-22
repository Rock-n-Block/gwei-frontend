import { useCallback, useEffect } from 'react';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';

import { is_production } from 'config';
import { clog } from 'utils/logger';

import { FetchPriceOptions, MoralisApiOptions } from 'types';

export const useMoralisApi = () => {
  const Web3Api = useMoralisWeb3Api();
  const { isAuthenticated, authenticate } = useMoralis();

  const fetchPrice = useCallback(
    async (address: string) => {
      const options: FetchPriceOptions = {
        address,
        chain: 'eth',
      };

      return Web3Api.token.getTokenPrice(options);
    },
    [Web3Api.token],
  );

  const fetchTransactions = useCallback(
    async (address: string) => {
      const options: MoralisApiOptions = {
        chain: is_production ? 'eth' : 'kovan',
        address,
      };

      return Web3Api.account.getTransactions(options);
    },
    [Web3Api.account],
  );

  useEffect(() => {
    if (!isAuthenticated) {
      authenticate({ signingMessage: 'Log in using Moralis' })
        .then((user) => {
          clog('logged in user:', user);
          clog(user?.get('ethAddress'));
        })
        .catch((error) => {
          clog(error);
        });
    }
  }, [authenticate, isAuthenticated]);

  return { fetchTransactions, fetchPrice };
};
