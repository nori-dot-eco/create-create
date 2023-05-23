'use client';

import { useNetwork, useSwitchNetwork } from 'wagmi';

export const NetworkSwitcher = () => {
  const { chain } = useNetwork();
  const { chains, switchNetwork } = useSwitchNetwork();

  const handleChainChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switchNetwork?.(Number(event.target.value));
  };

  return (
    <>
      {switchNetwork === undefined ? undefined : (
        <form>
          <select
            id="chain-select"
            value={chain?.id}
            onChange={handleChainChange}
            style={{ textAlign: 'right' }}
          >
            {chains.map((x) => (
              <option key={x.id} value={x.id}>
                {x.name}
              </option>
            ))}
          </select>
        </form>
      )}
    </>
  );
};
