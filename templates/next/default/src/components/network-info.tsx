'use client';

import { useNetwork } from 'wagmi';

export const NetworkInfo = () => {
  const { chain } = useNetwork();

  return (
    <>
      Connected to {chain?.name ?? chain?.id}
      {chain?.unsupported === true && ' (unsupported)'}
    </>
  );
};
