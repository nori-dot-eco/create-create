'use client';

import { useNetwork } from 'wagmi';
import { formatUnits } from 'viem';

import { useRemovalContractRead } from '../hooks/nori/use-removal-contract';

export const MarketInfo = () => {
  const { chain } = useNetwork();
  const { data } = useRemovalContractRead({
    functionName: 'getMarketBalance',
    chainId: chain?.id,
  });

  return (
    <>
      {data === undefined
        ? ' Please connect your wallet first.'
        : ` ${Number(formatUnits(data, 18)).toLocaleString()}`}
    </>
  );
};
