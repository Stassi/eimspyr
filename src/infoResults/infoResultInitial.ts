import type { DecodedDataTypes } from '../transcoder'
import type { DecoderIntentInitial } from '../decoderIntents'
import type { InfoResultDecoded } from './InfoResultDecoded'

export type InfoResultInitial = InfoResultDecoded<{
  challenge: number
  header: string
  headerInfo: string
}>

export default function infoResultInitial({
  intents,
  remaining: initialRemaining,
}: InfoResultDecoded<{
  intents: DecoderIntentInitial[]
}>): InfoResultInitial {
  return <InfoResultInitial>intents.reduce(
    (
      {
        remaining: prevRemaining,
        ...prevProps
      }: InfoResultDecoded<Partial<InfoResultInitial>>,
      { name, reader }: DecoderIntentInitial
    ) => {
      const { remaining, value }: DecodedDataTypes = reader(prevRemaining)

      return {
        ...prevProps,
        [name]: value,
        remaining,
      }
    },
    { remaining: initialRemaining }
  )
}
