import type { DecodedDataTypes } from './decoder'
import type { Encoded } from './encoder'
import {
  readByte,
  readCharacter,
  readLong,
  readLongLong,
  readShort,
  readString,
} from './decoder'
import { writeCharacter, writeLong, writeString } from './encoder'

export type { DecodedDataTypes, Encoded }
export {
  readByte,
  readCharacter,
  readLong,
  readLongLong,
  readShort,
  readString,
  writeCharacter,
  writeLong,
  writeString,
}
