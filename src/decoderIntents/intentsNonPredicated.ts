import type { DecoderIntentNonPredicated } from '../infoResultNonPredicated'
import {
  readByte,
  readCharacter,
  readLong,
  readShort,
  readString,
} from '../transcoder/decoder'

const intentsNonPredicated: DecoderIntentNonPredicated[] = [
  {
    name: 'header',
    reader: readLong,
  },
  {
    name: 'headerInfo',
    reader: readCharacter,
  },
  {
    name: 'protocolVersion',
    reader: readByte,
  },
  {
    name: 'serverName',
    reader: readString,
  },
  {
    name: 'map',
    reader: readString,
  },
  {
    name: 'folder',
    reader: readString,
  },
  {
    name: 'game',
    reader: readString,
  },
  {
    name: 'platformIDShort',
    reader: readShort,
  },
  {
    name: 'players',
    reader: readByte,
  },
  {
    name: 'playersMax',
    reader: readByte,
  },
  {
    name: 'bots',
    reader: readByte,
  },
  {
    name: 'serverType',
    reader: readCharacter,
  },
  {
    name: 'environment',
    reader: readCharacter,
  },
  {
    name: 'visibility',
    reader: readByte,
  },
  {
    name: 'antiCheat',
    reader: readByte,
  },
  {
    name: 'serverVersion',
    reader: readString,
  },
  {
    name: 'extraDataFlag',
    reader: readByte,
  },
]

export default intentsNonPredicated
