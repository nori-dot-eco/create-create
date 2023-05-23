'use client';

import { useAccount, useBalance, useNetwork } from 'wagmi';

const CHAIN_CURRENCY = {
  1: 'ETH',
  5: 'ETH',
  137: 'MATIC',
  80_001: 'MATIC',
} as const;

export const AccountBalance = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { data } = useBalance({ address, watch: true });
  const currency =
    CHAIN_CURRENCY[(chain?.id as keyof typeof CHAIN_CURRENCY) ?? 80_001] ??
    'MATIC';

  return <>{`${data?.formatted ?? '0.0'} ${currency}`}</>;
};
