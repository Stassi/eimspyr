import { Buffer } from 'node:buffer'
import { ParsedDataTypes } from './readSRCDSResponse'

export type InfoResultAndRemaining<T> = T & { remaining: Buffer }

export type ReaderIntent<Name> = {
  name: Name
  reader: (buffer: Buffer) => ParsedDataTypes
}
