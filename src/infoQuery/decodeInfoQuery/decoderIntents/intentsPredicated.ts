import type { ReaderIntent } from './ReaderIntent'
import { decodeLongLong, decodeShort, decodeString } from '../../../transcoder'

export type DecoderIntentPredicated = {
  predicateMask: 0x01 | 0x10 | 0x20 | 0x40 | 0x80
} & ReaderIntent<
  | 'appID'
  | 'keywords'
  | 'platformIDLong'
  | 'port'
  | 'spectatorName'
  | 'spectatorPort'
>

const intentsPredicated: DecoderIntentPredicated[] = [
  {
    name: 'port',
    predicateMask: 0x80,
    reader: decodeShort,
  },
  {
    name: 'platformIDLong',
    predicateMask: 0x10,
    reader: decodeLongLong,
  },
  {
    name: 'spectatorPort',
    predicateMask: 0x40,
    reader: decodeShort,
  },
  {
    name: 'spectatorName',
    predicateMask: 0x40,
    reader: decodeString,
  },
  {
    name: 'keywords',
    predicateMask: 0x20,
    reader: decodeString,
  },
  {
    name: 'appID',
    predicateMask: 0x01,
    reader: decodeLongLong,
  },
]

export default intentsPredicated
