import type { InfoResultAndRemaining, ReaderIntent } from './infoResultTypes'
import type { ParsedDataTypes } from './readSRCDSResponse'
import { Buffer } from 'node:buffer'

export type NonPredicatedReaderIntent = ReaderIntent<
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

export type NonPredicatedInfoResult = InfoResultAndRemaining<{
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
}: {
  intents: NonPredicatedReaderIntent[]
  remaining: Buffer
}): NonPredicatedInfoResult {
  return <NonPredicatedInfoResult>intents.reduce(
    (
      { remaining: prevRemaining, ...prevProps }: { remaining: Buffer },
      { name, reader }: NonPredicatedReaderIntent
    ) => {
      const { remaining, value }: ParsedDataTypes = reader(prevRemaining)

      return {
        ...prevProps,
        [name]: value,
        remaining,
      }
    },
    { remaining: initialRemaining }
  )
}
