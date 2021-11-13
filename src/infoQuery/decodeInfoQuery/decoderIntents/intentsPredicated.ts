import type { DecoderIntent } from './DecoderIntent'
import { decodeLongLong, decodeShort, decodeString } from '../../../transcoder'

export type DecoderIntentPredicated = {
  predicateMask: 0x01 | 0x10 | 0x20 | 0x40 | 0x80
} & DecoderIntent<
  | 'appID'
  | 'keywords'
  | 'platformIDLong'
  | 'port'
  | 'spectatorName'
  | 'spectatorPort'
>

const intentsPredicated: DecoderIntentPredicated[] = [
  {
    decoder: decodeShort,
    name: 'port',
    predicateMask: 0x80,
  },
  {
    decoder: decodeLongLong,
    name: 'platformIDLong',
    predicateMask: 0x10,
  },
  {
    decoder: decodeShort,
    name: 'spectatorPort',
    predicateMask: 0x40,
  },
  {
    decoder: decodeString,
    name: 'spectatorName',
    predicateMask: 0x40,
  },
  {
    decoder: decodeString,
    name: 'keywords',
    predicateMask: 0x20,
  },
  {
    decoder: decodeLongLong,
    name: 'appID',
    predicateMask: 0x01,
  },
]

export default intentsPredicated
