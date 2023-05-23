import type {
  UseContractEventConfig,
  UseContractReadConfig,
  UseContractWriteConfig,
} from 'wagmi';
import { useContractRead, useContractWrite, useContractEvent } from 'wagmi';
import type { ReadContractResult } from 'wagmi/actions';

import { marketABI, marketAddress } from '../../config/contracts';

export const useMarketContractRead = <
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof marketABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof marketABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  >
): ReturnType<typeof useContractRead<typeof marketABI, TFunctionName>> => {
  return useContractRead({
    abi: marketABI,
    address: marketAddress[config.chainId as keyof typeof marketAddress],
    ...config,
  } as UseContractReadConfig<typeof marketABI, TFunctionName, TSelectData>) as ReturnType<
    typeof useContractRead<typeof marketABI, TFunctionName>
  >;
};

export const useMarketContractWrite = <TFunctionName extends string>(
  config: Omit<
    UseContractWriteConfig<typeof marketABI, TFunctionName>,
    'abi' | 'address'
  >
): ReturnType<typeof useContractWrite<typeof marketABI, TFunctionName>> => {
  return useContractWrite({
    abi: marketABI,
    address: marketAddress[config.chainId as keyof typeof marketAddress],
    ...config,
  } as UseContractWriteConfig<typeof marketABI, TFunctionName>) as ReturnType<
    typeof useContractWrite<typeof marketABI, TFunctionName>
  >;
};

export const useMarketContractEvent = <TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof marketABI, TEventName>,
    'abi' | 'address'
  >
): ReturnType<typeof useContractEvent<typeof marketABI, TEventName>> => {
  return useContractEvent({
    abi: marketABI,
    address: marketAddress[config.chainId as keyof typeof marketAddress],
    ...config,
  } as UseContractEventConfig<typeof marketABI, TEventName>) as ReturnType<
    typeof useContractEvent<typeof marketABI, TEventName>
  >;
};
