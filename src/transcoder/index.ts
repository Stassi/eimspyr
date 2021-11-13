import type { DecodedDataTypes } from './decoder'
import type { Encoded } from './encoder'
import {
  decodeByte,
  decodeCharacter,
  decodeLong,
  decodeLongLong,
  decodeShort,
  decodeString,
} from './decoder'
import { encodeCharacter, encodeLong, encodeString } from './encoder'

export type { DecodedDataTypes, Encoded }
export {
  decodeByte,
  decodeCharacter,
  decodeLong,
  decodeLongLong,
  decodeShort,
  decodeString,
  encodeCharacter,
  encodeLong,
  encodeString,
}
