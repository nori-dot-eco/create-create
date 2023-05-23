import type {
  UseContractEventConfig,
  UseContractReadConfig,
  UseContractWriteConfig,
} from 'wagmi';
import { useContractEvent, useContractWrite, useContractRead } from 'wagmi';
import type { ReadContractResult } from 'wagmi/actions';

import { usdcABI, usdcAddress } from '../../config/contracts';

export const useUsdcContractRead = <
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof usdcABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof usdcABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  >
): ReturnType<typeof useContractRead<typeof usdcABI, TFunctionName>> => {
  return useContractRead({
    abi: usdcABI,
    address: usdcAddress[config.chainId as keyof typeof usdcAddress],
    ...config,
  } as UseContractReadConfig<typeof usdcABI, TFunctionName, TSelectData>) as ReturnType<
    typeof useContractRead<typeof usdcABI, TFunctionName>
  >;
};

export const useUsdcContractWrite = <TFunctionName extends string>(
  config: Omit<
    UseContractWriteConfig<typeof usdcABI, TFunctionName>,
    'abi' | 'address'
  >
): ReturnType<typeof useContractWrite<typeof usdcABI, TFunctionName>> => {
  return useContractWrite({
    abi: usdcABI,
    address: usdcAddress[config.chainId as keyof typeof usdcAddress],
    ...config,
  } as UseContractWriteConfig<typeof usdcABI, TFunctionName>) as ReturnType<
    typeof useContractWrite<typeof usdcABI, TFunctionName>
  >;
};

export const useUsdcContractEvent = <TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof usdcABI, TEventName>,
    'abi' | 'address'
  >
): ReturnType<typeof useContractEvent<typeof usdcABI, TEventName>> => {
  return useContractEvent({
    abi: usdcABI,
    address: usdcAddress[config.chainId as keyof typeof usdcAddress],
    ...config,
  } as UseContractEventConfig<typeof usdcABI, TEventName>) as ReturnType<
    typeof useContractEvent<typeof usdcABI, TEventName>
  >;
};
