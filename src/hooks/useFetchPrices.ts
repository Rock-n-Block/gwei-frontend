import { useCallback, useEffect, useState } from 'react';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';

import { clog } from 'utils/logger';

import { FetchPriceOptions } from 'types';

export const useFetchPrices = (token0Address: string, token1Address: string) => {
  const [price0, setPrice0] = useState(0);
  const [price1, setPrice1] = useState(0);
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
    fetchPrice(token0Address).then((res) => setPrice0(res.usdPrice));
    fetchPrice(token1Address).then((res) => setPrice1(res.usdPrice));
  }, [authenticate, fetchPrice, isAuthenticated, token0Address, token1Address]);

  return { price0, price1 };
};
