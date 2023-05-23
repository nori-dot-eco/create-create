'use client';

import { useAccount } from 'wagmi';

export const Connected = ({ children }: { children: React.ReactNode }) => {
  const { isConnected } = useAccount();

  return <>{isConnected ? children : <div>Connect a wallet</div>}</>;
};
