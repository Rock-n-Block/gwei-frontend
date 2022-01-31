import { useCallback, useEffect, useState } from 'react';

import { useWalletConnectorContext } from 'services';

export const useGetTotalSupply = (address: string, abi: any[]): string => {
  const { walletService } = useWalletConnectorContext();
  const [totalSupply, setTotalSupply] = useState('');

  const getTotalSupply = useCallback(
    () => walletService.getTotalSupply(address, abi),
    [walletService, address, abi],
  );

  useEffect(() => {
    getTotalSupply().then((r) => setTotalSupply(r));
  }, [getTotalSupply]);

  return totalSupply;
};
