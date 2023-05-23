import type { UseContractReadConfig, UseContractWriteConfig } from 'wagmi';
import { useContractWrite, useContractRead } from 'wagmi';
import type { ReadContractResult } from 'wagmi/actions';

import { lockedNoriABI, lockedNoriAddress } from '../../config/contracts';

export const useLockedNoriContractRead = <
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof lockedNoriABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof lockedNoriABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  >
): ReturnType<typeof useContractRead<typeof lockedNoriABI, TFunctionName>> => {
  return useContractRead({
    abi: lockedNoriABI,
    address:
      lockedNoriAddress[config.chainId as keyof typeof lockedNoriAddress],
    ...config,
  } as UseContractReadConfig<typeof lockedNoriABI, TFunctionName, TSelectData>) as ReturnType<
    typeof useContractRead<typeof lockedNoriABI, TFunctionName>
  >;
};

export const useLockedNoriContractWrite = <TFunctionName extends string>(
  config: Omit<
    UseContractWriteConfig<typeof lockedNoriABI, TFunctionName>,
    'abi' | 'address'
  >
): ReturnType<typeof useContractWrite<typeof lockedNoriABI, TFunctionName>> => {
  return useContractWrite({
    abi: lockedNoriABI,
    address:
      lockedNoriAddress[config.chainId as keyof typeof lockedNoriAddress],
    ...config,
  } as UseContractWriteConfig<typeof lockedNoriABI, TFunctionName>) as ReturnType<
    typeof useContractWrite<typeof lockedNoriABI, TFunctionName>
  >;
};
