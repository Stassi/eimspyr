import type { DecoderIntentNonPredicated } from './infoResultNonPredicated'
import type { DecoderIntentPredicated } from './infoResultPredicated'
import {
  readByte,
  readCharacter,
  readLong,
  readLongLong,
  readShort,
  readString,
} from './transcoder/decoder'

const nonPredicated: DecoderIntentNonPredicated[] = [
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

const predicated: DecoderIntentPredicated[] = [
  {
    name: 'port',
    predicateMask: 0x80,
    reader: readShort,
  },
  {
    name: 'platformIDLong',
    predicateMask: 0x10,
    reader: readLongLong,
  },
  {
    name: 'spectatorPort',
    predicateMask: 0x40,
    reader: readShort,
  },
  {
    name: 'spectatorName',
    predicateMask: 0x40,
    reader: readString,
  },
  {
    name: 'keywords',
    predicateMask: 0x20,
    reader: readString,
  },
  {
    name: 'appID',
    predicateMask: 0x01,
    reader: readLongLong,
  },
]

export { nonPredicated, predicated }
