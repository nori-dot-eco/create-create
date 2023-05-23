import type { UseContractReadConfig, UseContractWriteConfig } from 'wagmi';
import { useContractWrite, useContractRead } from 'wagmi';
import type { ReadContractResult } from 'wagmi/actions';

import {
  bridgedPolygonNoriABI,
  bridgedPolygonNoriAddress,
} from '../../config/contracts';

export const useBridgedPolygonNoriContractRead = <
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof bridgedPolygonNoriABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<
      typeof bridgedPolygonNoriABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address'
  >
): ReturnType<
  typeof useContractRead<typeof bridgedPolygonNoriABI, TFunctionName>
> => {
  return useContractRead({
    abi: bridgedPolygonNoriABI,
    address:
      bridgedPolygonNoriAddress[
        config.chainId as keyof typeof bridgedPolygonNoriAddress
      ],
    ...config,
  } as UseContractReadConfig<typeof bridgedPolygonNoriABI, TFunctionName, TSelectData>) as ReturnType<
    typeof useContractRead<typeof bridgedPolygonNoriABI, TFunctionName>
  >;
};

export const useBridgedPolygonNoriContractWrite = <
  TFunctionName extends string
>(
  config: Omit<
    UseContractWriteConfig<typeof bridgedPolygonNoriABI, TFunctionName>,
    'abi' | 'address'
  >
): ReturnType<
  typeof useContractWrite<typeof bridgedPolygonNoriABI, TFunctionName>
> => {
  return useContractWrite({
    abi: bridgedPolygonNoriABI,
    address:
      bridgedPolygonNoriAddress[
        config.chainId as keyof typeof bridgedPolygonNoriAddress
      ],
    ...config,
  } as UseContractWriteConfig<typeof bridgedPolygonNoriABI, TFunctionName>) as ReturnType<
    typeof useContractWrite<typeof bridgedPolygonNoriABI, TFunctionName>
  >;
};
