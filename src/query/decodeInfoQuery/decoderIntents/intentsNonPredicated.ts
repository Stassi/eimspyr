import type { DecoderIntent } from './DecoderIntent'
import {
  decodeByte,
  decodeCharacter,
  decodeLong,
  decodeShort,
  decodeString,
} from '../../../transcoder'

export type DecoderIntentNonPredicated = DecoderIntent<
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

const intentsNonPredicated: DecoderIntentNonPredicated[] = [
  {
    decoder: decodeLong,
    name: 'header',
  },
  {
    decoder: decodeCharacter,
    name: 'headerInfo',
  },
  {
    decoder: decodeByte,
    name: 'protocolVersion',
  },
  {
    decoder: decodeString,
    name: 'serverName',
  },
  {
    decoder: decodeString,
    name: 'map',
  },
  {
    decoder: decodeString,
    name: 'folder',
  },
  {
    decoder: decodeString,
    name: 'game',
  },
  {
    decoder: decodeShort,
    name: 'platformIDShort',
  },
  {
    decoder: decodeByte,
    name: 'players',
  },
  {
    decoder: decodeByte,
    name: 'playersMax',
  },
  {
    decoder: decodeByte,
    name: 'bots',
  },
  {
    decoder: decodeCharacter,
    name: 'serverType',
  },
  {
    decoder: decodeCharacter,
    name: 'environment',
  },
  {
    decoder: decodeByte,
    name: 'visibility',
  },
  {
    decoder: decodeByte,
    name: 'antiCheat',
  },
  {
    decoder: decodeString,
    name: 'serverVersion',
  },
  {
    decoder: decodeByte,
    name: 'extraDataFlag',
  },
]

export default intentsNonPredicated
