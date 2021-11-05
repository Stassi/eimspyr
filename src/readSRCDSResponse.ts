import { Buffer } from 'node:buffer'

type ParsedDataType<T> = { remaining: Buffer; value: T }

type ParsedBigInt = ParsedDataType<bigint>
type ParsedNumber = ParsedDataType<number>
type ParsedString = ParsedDataType<string>

export type ParsedDataTypes = ParsedDataType<bigint | number | string>

export function readByte(buffer: Buffer): ParsedNumber {
  return {
    remaining: buffer.subarray(1),
    value: buffer.readUInt8(),
  }
}

export function readCharacter(buffer: Buffer): ParsedString {
  return {
    remaining: buffer.subarray(1),
    value: String.fromCharCode(buffer.readUInt8()),
  }
}

export function readLong(buffer: Buffer): ParsedNumber {
  return {
    remaining: buffer.subarray(4),
    value: buffer.readInt32LE(),
  }
}

export function readLongLong(buffer: Buffer): ParsedBigInt {
  return {
    remaining: buffer.subarray(8),
    value: buffer.readBigUInt64LE(),
  }
}

export function readShort(buffer: Buffer): ParsedNumber {
  return {
    remaining: buffer.subarray(2),
    value: buffer.readInt16LE(),
  }
}

export function readString(buffer: Buffer): ParsedString {
  const terminator: number = buffer.indexOf(0) + 1
  return {
    remaining: buffer.subarray(terminator),
    value: buffer.subarray(0, terminator).toString(),
  }
}
