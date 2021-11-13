import type { ReaderIntent } from './ReaderIntent'
import {
  decodeByte,
  decodeCharacter,
  decodeLong,
  decodeShort,
  decodeString,
} from '../../../transcoder'

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

const intentsNonPredicated: DecoderIntentNonPredicated[] = [
  {
    name: 'header',
    reader: decodeLong,
  },
  {
    name: 'headerInfo',
    reader: decodeCharacter,
  },
  {
    name: 'protocolVersion',
    reader: decodeByte,
  },
  {
    name: 'serverName',
    reader: decodeString,
  },
  {
    name: 'map',
    reader: decodeString,
  },
  {
    name: 'folder',
    reader: decodeString,
  },
  {
    name: 'game',
    reader: decodeString,
  },
  {
    name: 'platformIDShort',
    reader: decodeShort,
  },
  {
    name: 'players',
    reader: decodeByte,
  },
  {
    name: 'playersMax',
    reader: decodeByte,
  },
  {
    name: 'bots',
    reader: decodeByte,
  },
  {
    name: 'serverType',
    reader: decodeCharacter,
  },
  {
    name: 'environment',
    reader: decodeCharacter,
  },
  {
    name: 'visibility',
    reader: decodeByte,
  },
  {
    name: 'antiCheat',
    reader: decodeByte,
  },
  {
    name: 'serverVersion',
    reader: decodeString,
  },
  {
    name: 'extraDataFlag',
    reader: decodeByte,
  },
]

export default intentsNonPredicated
