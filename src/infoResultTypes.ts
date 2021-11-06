import { Buffer } from 'node:buffer'
import { DecodedDataTypes } from './transcoder/decoder'

export type InfoResultAndRemaining<T> = T & { remaining: Buffer }

export type ReaderIntent<Name> = {
  name: Name
  reader: (buffer: Buffer) => DecodedDataTypes
}
