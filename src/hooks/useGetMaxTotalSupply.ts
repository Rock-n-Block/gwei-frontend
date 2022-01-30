import { useCallback, useEffect, useState } from 'react';

import { useWalletConnectorContext } from '../services';

export const useGetMaxTotalSupply = (address: string, abi: any[], decimals: number): string => {
  const { walletService } = useWalletConnectorContext();
  const [maxTotalSupply, setMaxTotalSupply] = useState('');

  const getTotalSupply = useCallback(
    () => walletService.getMaxTotalSupply(address, abi, decimals),
    [walletService, address, abi, decimals],
  );

  useEffect(() => {
    getTotalSupply().then((r) => setMaxTotalSupply(r));
  }, [getTotalSupply]);

  return maxTotalSupply;
};
