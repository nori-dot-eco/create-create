'use client';

import { useState } from 'react';
import { useNetwork } from 'wagmi';

import { useCertificateContractEvent } from '../hooks/nori/use-certificate-contract';

import { EventTable } from './event-table';

type RealtimeCertificateLogs = Parameters<
  Parameters<typeof useCertificateContractEvent>[0]['listener']
>[0];

type EventNames = Parameters<
  typeof useCertificateContractEvent
>[0]['eventName'];

type ExtractEventTypes<TEventValue extends EventNames> = {
  [K in keyof RealtimeCertificateLogs[number]]: RealtimeCertificateLogs[number][K] extends TEventValue
    ? RealtimeCertificateLogs[number][K]
    : never;
}[];

export const RealTimeCertificateEventList = <TEventName extends EventNames>({
  eventName,
}: {
  eventName: TEventName;
}) => {
  const [logs, setLogs] = useState<ExtractEventTypes<TEventName>>([]);
  const { chain } = useNetwork();
  const chainId = chain?.id as Parameters<
    typeof useCertificateContractEvent
  >[0]['chainId'];
  useCertificateContractEvent({
    eventName,
    chainId,
    listener: (newLogs) =>
      setLogs((x) => [...x, ...newLogs] as ExtractEventTypes<TEventName>),
  });

  return <EventTable logs={logs} />;
};
