import type { DecoderIntentPredicated } from '../infoResultPredicated'
import { readLongLong, readShort, readString } from '../transcoder/decoder'

const intentsPredicated: DecoderIntentPredicated[] = [
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

export default intentsPredicated
