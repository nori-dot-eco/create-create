import type { UseContractReadConfig, UseContractWriteConfig } from 'wagmi';
import { useContractWrite, useContractRead } from 'wagmi';
import type { ReadContractResult } from 'wagmi/actions';

import {
  restrictedNoriABI,
  restrictedNoriAddress,
} from '../../config/contracts';

export const useRestrictedNoriContractRead = <
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof restrictedNoriABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof restrictedNoriABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  >
): ReturnType<
  typeof useContractRead<typeof restrictedNoriABI, TFunctionName>
> => {
  return useContractRead({
    abi: restrictedNoriABI,
    address:
      restrictedNoriAddress[
        config.chainId as keyof typeof restrictedNoriAddress
      ],
    ...config,
  } as UseContractReadConfig<typeof restrictedNoriABI, TFunctionName, TSelectData>) as ReturnType<
    typeof useContractRead<typeof restrictedNoriABI, TFunctionName>
  >;
};

export const useRestrictedNoriContractWrite = <TFunctionName extends string>(
  config: Omit<
    UseContractWriteConfig<typeof restrictedNoriABI, TFunctionName>,
    'abi' | 'address'
  >
): ReturnType<
  typeof useContractWrite<typeof restrictedNoriABI, TFunctionName>
> => {
  return useContractWrite({
    abi: restrictedNoriABI,
    address:
      restrictedNoriAddress[
        config.chainId as keyof typeof restrictedNoriAddress
      ],
    ...config,
  } as UseContractWriteConfig<typeof restrictedNoriABI, TFunctionName>) as ReturnType<
    typeof useContractWrite<typeof restrictedNoriABI, TFunctionName>
  >;
};
