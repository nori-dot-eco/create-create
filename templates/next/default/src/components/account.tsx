'use client';

import { useAccount } from 'wagmi';

export const Account = () => {
  const { address } = useAccount();
  const shortAddress =
    typeof address === 'string'
      ? `${address.slice(0, 6)}...${address.slice(-4)}`
      : undefined;

  return <div>{shortAddress}</div>;
};
