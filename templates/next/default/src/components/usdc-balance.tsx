'use client';

import { useAccount, useNetwork } from 'wagmi';
import { formatUnits } from 'viem';

import { useUsdcContractRead } from '../hooks/nori/use-usdc-contract';

export const UsdcBalance = () => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { data } = useUsdcContractRead({
    watch: true,
    functionName: 'balanceOf',
    chainId: chain?.id,
    args: typeof address === 'string' ? [address] : undefined,
  });

  return (
    <>
      {data === undefined
        ? ' Please connect your wallet first.'
        : ` ${Number(formatUnits(data, 6)).toLocaleString()} USDC`}
    </>
  );
};
