import type {
  UseContractEventConfig,
  UseContractReadConfig,
  UseContractWriteConfig,
} from 'wagmi';
import { useContractEvent, useContractWrite, useContractRead } from 'wagmi';
import type { ReadContractResult } from 'wagmi/actions';

import { certificateABI, certificateAddress } from '../../config/contracts';

export const useCertificateContractRead = <
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof certificateABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<typeof certificateABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  >
): ReturnType<typeof useContractRead<typeof certificateABI, TFunctionName>> => {
  return useContractRead({
    abi: certificateABI,
    address:
      certificateAddress[config.chainId as keyof typeof certificateAddress],
    ...config,
  } as UseContractReadConfig<typeof certificateABI, TFunctionName, TSelectData>) as ReturnType<
    typeof useContractRead<typeof certificateABI, TFunctionName>
  >;
};

export const useCertificateContractWrite = <TFunctionName extends string>(
  config: Omit<
    UseContractWriteConfig<typeof certificateABI, TFunctionName>,
    'abi' | 'address'
  >
): ReturnType<
  typeof useContractWrite<typeof certificateABI, TFunctionName>
> => {
  return useContractWrite({
    abi: certificateABI,
    address:
      certificateAddress[config.chainId as keyof typeof certificateAddress],
    ...config,
  } as UseContractWriteConfig<typeof certificateABI, TFunctionName>) as ReturnType<
    typeof useContractWrite<typeof certificateABI, TFunctionName>
  >;
};

export const useCertificateContractEvent = <TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof certificateABI, TEventName>,
    'abi' | 'address'
  >
): ReturnType<typeof useContractEvent<typeof certificateABI, TEventName>> => {
  return useContractEvent({
    abi: certificateABI,
    address:
      certificateAddress[config.chainId as keyof typeof certificateAddress],
    ...config,
  } as UseContractEventConfig<typeof certificateABI, TEventName>) as ReturnType<
    typeof useContractEvent<typeof certificateABI, TEventName>
  >;
};
