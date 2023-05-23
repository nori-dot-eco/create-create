import type { UseContractReadConfig, UseContractWriteConfig } from 'wagmi';
import { useContractWrite, useContractRead } from 'wagmi';
import type { ReadContractResult } from 'wagmi/actions';

import { nccrABI, nccrAddress } from '../../config/contracts';

export const useNccrContractRead = <
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof nccrABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof nccrABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  >
): ReturnType<typeof useContractRead<typeof nccrABI, TFunctionName>> => {
  return useContractRead({
    abi: nccrABI,
    address: nccrAddress[config.chainId as keyof typeof nccrAddress],
    ...config,
  } as UseContractReadConfig<typeof nccrABI, TFunctionName, TSelectData>) as ReturnType<
    typeof useContractRead<typeof nccrABI, TFunctionName>
  >;
};

export const useNccrContractWrite = <TFunctionName extends string>(
  config: Omit<
    UseContractWriteConfig<typeof nccrABI, TFunctionName>,
    'abi' | 'address'
  >
): ReturnType<typeof useContractWrite<typeof nccrABI, TFunctionName>> => {
  return useContractWrite({
    abi: nccrABI,
    address: nccrAddress[config.chainId as keyof typeof nccrAddress],
    ...config,
  } as UseContractWriteConfig<typeof nccrABI, TFunctionName>) as ReturnType<
    typeof useContractWrite<typeof nccrABI, TFunctionName>
  >;
};
