import { useCallback, useEffect, useState } from 'react';

import { useWalletConnectorContext } from '../services';

export const useGetTotalSupply = (address: string, abi: any[], decimals: number): string => {
  const { walletService } = useWalletConnectorContext();
  const [totalSupply, setTotalSupply] = useState('');

  const getTotalSupply = useCallback(
    () => walletService.getTotalSupply(address, abi, decimals),
    [walletService, address, abi, decimals],
  );

  useEffect(() => {
    getTotalSupply().then((r) => setTotalSupply(r));
  }, [getTotalSupply]);

  return totalSupply;
};
