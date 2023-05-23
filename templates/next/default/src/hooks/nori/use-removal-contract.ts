import type { UseContractReadConfig, UseContractWriteConfig } from 'wagmi';
import { useContractWrite, useContractRead } from 'wagmi';
import type { ReadContractResult } from 'wagmi/actions';

import { removalABI, removalAddress } from '../../config/contracts';

export const useRemovalContractRead = <
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof removalABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof removalABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  >
): ReturnType<typeof useContractRead<typeof removalABI, TFunctionName>> => {
  return useContractRead({
    abi: removalABI,
    address: removalAddress[config.chainId as keyof typeof removalAddress],
    ...config,
  } as UseContractReadConfig<typeof removalABI, TFunctionName, TSelectData>) as ReturnType<
    typeof useContractRead<typeof removalABI, TFunctionName>
  >;
};

export const useRemovalContractWrite = <TFunctionName extends string>(
  config: Omit<
    UseContractWriteConfig<typeof removalABI, TFunctionName>,
    'abi' | 'address'
  >
): ReturnType<typeof useContractWrite<typeof removalABI, TFunctionName>> => {
  return useContractWrite({
    abi: removalABI,
    address: removalAddress[config.chainId as keyof typeof removalAddress],
    ...config,
  } as UseContractWriteConfig<typeof removalABI, TFunctionName>) as ReturnType<
    typeof useContractWrite<typeof removalABI, TFunctionName>
  >;
};
