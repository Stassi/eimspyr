import { Buffer } from 'node:buffer'
import type { DecodedDataTypes } from './transcoder/decoder'
import type { InfoResultAndRemaining, ReaderIntent } from './infoResultTypes'

export type PredicatedReaderIntent = {
  predicateMask: 0x01 | 0x10 | 0x20 | 0x40 | 0x80
} & ReaderIntent<
  | 'appID'
  | 'keywords'
  | 'platformIDLong'
  | 'port'
  | 'spectatorName'
  | 'spectatorPort'
>

export type PredicatedInfoResult = InfoResultAndRemaining<
  Partial<{
    appID: bigint
    keywords: string
    platformIDLong: bigint
    port: number
  }>
>

export default function predicatedInfoResult({
  extraDataFlag,
  intents,
  remaining: initialRemaining,
}: {
  extraDataFlag: number
  intents: PredicatedReaderIntent[]
  remaining: Buffer
}): PredicatedInfoResult {
  return intents.reduce(
    (
      { remaining: prevRemaining, ...prevProps }: { remaining: Buffer },
      { name, predicateMask, reader }: PredicatedReaderIntent
    ) => {
      if (!!(extraDataFlag & predicateMask)) {
        const { remaining, value }: DecodedDataTypes = reader(prevRemaining)
        return {
          ...prevProps,
          [name]: value,
          remaining,
        }
      } else return { ...prevProps, remaining: prevRemaining }
    },
    { remaining: initialRemaining }
  )
}
