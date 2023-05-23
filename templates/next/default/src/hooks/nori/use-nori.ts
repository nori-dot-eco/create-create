import type { UseContractReadConfig, UseContractWriteConfig } from 'wagmi';
import { useContractWrite, useContractRead } from 'wagmi';
import type { ReadContractResult } from 'wagmi/actions';

import { noriABI, noriAddress } from '../../config/contracts';

export const useNoriContractRead = <
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof noriABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof noriABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  >
): ReturnType<typeof useContractRead<typeof noriABI, TFunctionName>> => {
  return useContractRead({
    abi: noriABI,
    address: noriAddress[config.chainId as keyof typeof noriAddress],
    ...config,
  } as UseContractReadConfig<typeof noriABI, TFunctionName, TSelectData>) as ReturnType<
    typeof useContractRead<typeof noriABI, TFunctionName>
  >;
};

export const useNoriContractWrite = <TFunctionName extends string>(
  config: Omit<
    UseContractWriteConfig<typeof noriABI, TFunctionName>,
    'abi' | 'address'
  >
): ReturnType<typeof useContractWrite<typeof noriABI, TFunctionName>> => {
  return useContractWrite({
    abi: noriABI,
    address: noriAddress[config.chainId as keyof typeof noriAddress],
    ...config,
  } as UseContractWriteConfig<typeof noriABI, TFunctionName>) as ReturnType<
    typeof useContractWrite<typeof noriABI, TFunctionName>
  >;
};
