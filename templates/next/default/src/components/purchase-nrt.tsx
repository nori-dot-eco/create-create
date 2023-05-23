'use client';

import type { Address } from 'wagmi';
import { useNetwork, useAccount, useSignTypedData } from 'wagmi';
import { parseUnits } from 'viem';
import { splitSignature, hexlify, hexZeroPad } from 'ethers/lib/utils.js';
import { useState } from 'react';

import { marketAddress, usdcAddress } from '../config/contracts';
import {
  useMarketContractRead,
  useMarketContractWrite,
} from '../hooks/nori/use-market-contract';
import { useUsdcContractRead } from '../hooks/nori/use-usdc-contract';

export const PurchaseNrt = () => {
  const deadline = BigInt(Date.now() + 1000 * 60 * 60);
  const [purchaseAmount, setPurchaseAmount] = useState<`${number}`>('1');

  const { address } = useAccount();
  const { chain } = useNetwork();
  const { signTypedDataAsync } = useSignTypedData();
  const { data: nonce } = useUsdcContractRead({
    functionName: 'nonces',
    args: [address!],
    chainId: chain?.id,
  });

  const { write } = useMarketContractWrite({
    functionName: 'swap',
    chainId: chain?.id,
  });

  const { data: checkoutTotal } = useMarketContractRead({
    functionName: 'calculateCheckoutTotal',
    args: [parseUnits(purchaseAmount, 18)],
    chainId: chain?.id,
  });

  return (
    <>
      <input
        name="value"
        value={purchaseAmount}
        placeholder="Number of NRTs to purchase"
        onChange={(e) =>
          setPurchaseAmount(e.target.value as typeof purchaseAmount)
        }
      />
      <button
        disabled={typeof address !== 'string' || typeof write !== 'function'}
        onClick={async () => {
          const signedTypedData = await signTypedDataAsync({
            types: {
              EIP712Domain: [
                { name: 'name', type: 'string' },
                { name: 'version', type: 'string' },
                { name: 'verifyingContract', type: 'address' },
                { name: 'salt', type: 'bytes32' },
              ],
              Permit: [
                { name: 'owner', type: 'address' },
                { name: 'spender', type: 'address' },
                { name: 'value', type: 'uint256' },
                { name: 'nonce', type: 'uint256' },
                { name: 'deadline', type: 'uint256' },
              ],
            },
            message: {
              owner: address! as Address,
              spender: marketAddress[
                chain?.id as keyof typeof marketAddress
              ]! as Address,
              value: checkoutTotal!,
              nonce: nonce!,
              deadline,
            },
            primaryType: 'Permit',
            domain: {
              name: 'USD Coin (PoS)',
              version: '1',
              verifyingContract: usdcAddress[
                chain?.id as keyof typeof usdcAddress
              ] as Address,
              salt: hexZeroPad(hexlify(chain?.id!), 32) as Address,
            },
          });
          const { v, r, s } = splitSignature(signedTypedData);
          await write({
            args: [
              address!,
              address!,
              parseUnits(purchaseAmount, 18),
              deadline,
              v,
              r as Address,
              s as Address,
            ],
          });
        }}
      >
        Purchase NRT
      </button>
    </>
  );
};
