import type { NonPredicatedInfoResult } from './nonPredicatedInfoResult'
import type { PredicatedInfoResult } from './predicatedInfoResult'
import { Buffer } from 'node:buffer'
import nonPredicatedInfoResult from './nonPredicatedInfoResult'
import predicatedInfoResult from './predicatedInfoResult'
import {
  readByte,
  readCharacter,
  readLong,
  readLongLong,
  readShort,
  readString,
} from './readSRCDSResponse'

export type InfoResultBig = Omit<
  NonPredicatedInfoResult & PredicatedInfoResult,
  'remaining'
>

export default function readInfoQuery(message: Buffer): InfoResultBig {
  const {
    remaining: nonPredicatedRemaining,
    ...nonPredicatedRes
  }: NonPredicatedInfoResult = nonPredicatedInfoResult({
    remaining: message,
    intents: [
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
    ],
  })

  const {
    remaining: predicatedRemaining,
    ...predicatedRes
  }: PredicatedInfoResult = predicatedInfoResult({
    extraDataFlag: nonPredicatedRes.extraDataFlag,
    remaining: nonPredicatedRemaining,
    intents: [
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
    ],
  })

  return {
    ...nonPredicatedRes,
    ...predicatedRes,
  }
}
