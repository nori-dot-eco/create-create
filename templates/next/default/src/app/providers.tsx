'use client';

import { useEffect, useState } from 'react';
import { WagmiConfig } from 'wagmi';

import { config } from '../wagmi';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return <WagmiConfig config={config}>{mounted && children}</WagmiConfig>;
};
