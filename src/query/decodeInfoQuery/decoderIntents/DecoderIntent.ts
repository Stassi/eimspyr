import type { Buffer } from 'buffer'
import type { DecodedDataTypes } from '../../../transcoder'

export type DecoderIntent<Name> = {
  decoder: (buffer: Buffer) => DecodedDataTypes
  name: Name
}
