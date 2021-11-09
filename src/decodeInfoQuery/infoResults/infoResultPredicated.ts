import type { DecodedDataTypes } from '../../transcoder'
import type { DecoderIntentPredicated } from '../decoderIntents'
import type { InfoResultDecoded } from './InfoResultDecoded'

export type InfoResultPredicated = InfoResultDecoded<
  Partial<{
    appID: bigint
    keywords: string
    platformIDLong: bigint
    port: number
  }>
>

export default function infoResultPredicated({
  extraDataFlag,
  intents,
  remaining: initialRemaining,
}: InfoResultDecoded<{
  extraDataFlag: number
  intents: DecoderIntentPredicated[]
}>): InfoResultPredicated {
  return intents.reduce(
    (
      { remaining: prevRemaining, ...prevProps }: InfoResultPredicated,
      { name, predicateMask, reader }: DecoderIntentPredicated
    ) => {
      if (Boolean(extraDataFlag & predicateMask)) {
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
