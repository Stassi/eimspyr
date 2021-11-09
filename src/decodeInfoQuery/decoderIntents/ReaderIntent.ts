import type { Buffer } from 'node:buffer'
import type { DecodedDataTypes } from '../../transcoder'

export type ReaderIntent<Name> = {
  name: Name
  reader: (buffer: Buffer) => DecodedDataTypes
}
