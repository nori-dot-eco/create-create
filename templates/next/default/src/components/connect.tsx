'use client';

import type { BaseError } from 'viem';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export const Connect = () => {
  const { connector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div>
      <div>
        {isConnected && (
          <button onClick={() => disconnect()}>Disconnect</button>
        )}
        {!isConnected &&
          connectors
            .filter((x) => x.ready && x.id !== connector?.id)
            .map((x) => (
              <button key={x.id} onClick={() => connect({ connector: x })}>
                {x.name}
                {isLoading && x.id === pendingConnector?.id && ' (connecting)'}
              </button>
            ))}
      </div>
      {Boolean(error) && <div>{(error as BaseError).shortMessage}</div>}
    </div>
  );
};
