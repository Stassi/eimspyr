import type { Buffer } from 'node:buffer'

type DecodedDataType<T> = { remaining: Buffer; value: T }

type DecodedBigInt = DecodedDataType<bigint>
type DecodedNumber = DecodedDataType<number>
type DecodedString = DecodedDataType<string>

export type DecodedDataTypes = DecodedDataType<bigint | number | string>

export function readByte(buffer: Buffer): DecodedNumber {
  return {
    remaining: buffer.subarray(1),
    value: buffer.readUInt8(),
  }
}

export function readCharacter(buffer: Buffer): DecodedString {
  return {
    remaining: buffer.subarray(1),
    value: String.fromCharCode(buffer.readUInt8()),
  }
}

export function readLong(buffer: Buffer): DecodedNumber {
  return {
    remaining: buffer.subarray(4),
    value: buffer.readInt32LE(),
  }
}

export function readLongLong(buffer: Buffer): DecodedBigInt {
  return {
    remaining: buffer.subarray(8),
    value: buffer.readBigUInt64LE(),
  }
}

export function readShort(buffer: Buffer): DecodedNumber {
  return {
    remaining: buffer.subarray(2),
    value: buffer.readInt16LE(),
  }
}

export function readString(buffer: Buffer): DecodedString {
  const terminator: number = buffer.indexOf(0)

  return {
    remaining: buffer.subarray(terminator + 1),
    value: buffer.subarray(0, terminator).toString(),
  }
}
