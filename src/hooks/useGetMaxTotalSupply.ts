import { useCallback, useEffect, useState } from 'react';

import { useWalletConnectorContext } from 'services';

export const useGetMaxTotalSupply = (address: string, abi: any[]): string => {
  const { walletService } = useWalletConnectorContext();
  const [maxTotalSupply, setMaxTotalSupply] = useState('');

  const getTotalSupply = useCallback(
    () => walletService.getMaxTotalSupply(address, abi),
    [walletService, address, abi],
  );

  useEffect(() => {
    getTotalSupply().then((r) => setMaxTotalSupply(r));
  }, [getTotalSupply]);

  return maxTotalSupply;
};
