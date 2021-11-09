import type { DecodedDataTypes } from '../../transcoder'
import type { DecoderIntentNonPredicated } from '../decoderIntents'
import type { InfoResultDecoded } from './InfoResultDecoded'

export type InfoResultNonPredicated = InfoResultDecoded<{
  antiCheat: number
  bots: number
  environment: string
  extraDataFlag: number
  folder: string
  game: string
  header: number
  headerInfo: string
  map: string
  platformIDShort: number
  players: number
  playersMax: number
  protocolVersion: number
  serverName: string
  serverType: string
  serverVersion: string
  visibility: number
}>

export default function infoResultNonPredicated({
  intents,
  remaining: initialRemaining,
}: InfoResultDecoded<{
  intents: DecoderIntentNonPredicated[]
}>): InfoResultNonPredicated {
  return <InfoResultNonPredicated>intents.reduce(
    (
      {
        remaining: prevRemaining,
        ...prevProps
      }: InfoResultDecoded<Partial<InfoResultNonPredicated>>,
      { name, reader }: DecoderIntentNonPredicated
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
