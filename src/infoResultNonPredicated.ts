import type { DecodedDataTypes } from './transcoder/decoder'
import type { InfoResultAndRemaining, ReaderIntent } from './infoResultTypes'

export type DecoderIntentNonPredicated = ReaderIntent<
  | 'antiCheat'
  | 'bots'
  | 'environment'
  | 'extraDataFlag'
  | 'folder'
  | 'game'
  | 'header'
  | 'headerInfo'
  | 'map'
  | 'platformIDShort'
  | 'players'
  | 'playersMax'
  | 'protocolVersion'
  | 'serverName'
  | 'serverType'
  | 'serverVersion'
  | 'visibility'
>

export type InfoResultNonPredicated = InfoResultAndRemaining<{
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

export default function nonPredicatedInfoResult({
  intents,
  remaining: initialRemaining,
}: InfoResultAndRemaining<{
  intents: DecoderIntentNonPredicated[]
}>): InfoResultNonPredicated {
  return <InfoResultNonPredicated>intents.reduce(
    (
      {
        remaining: prevRemaining,
        ...prevProps
      }: InfoResultAndRemaining<Partial<InfoResultNonPredicated>>,
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
