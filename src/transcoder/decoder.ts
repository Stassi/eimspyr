import type { Buffer } from 'buffer'
import { increment } from 'dechainer'

type DecodedDataType<Value> = { remaining: Buffer; value: Value }

type DecodedBigInt = DecodedDataType<bigint>
type DecodedNumber = DecodedDataType<number>
type DecodedString = DecodedDataType<string>

export type DecodedDataTypes = DecodedDataType<bigint | number | string>

export function decodeByte(buffer: Buffer): DecodedNumber {
  return {
    remaining: buffer.subarray(1),
    value: buffer.readUInt8(),
  }
}

export function decodeCharacter(buffer: Buffer): DecodedString {
  return {
    remaining: buffer.subarray(1),
    value: String.fromCharCode(buffer.readUInt8()),
  }
}

export function decodeLong(buffer: Buffer): DecodedNumber {
  return {
    remaining: buffer.subarray(4),
    value: buffer.readInt32LE(),
  }
}

export function decodeLongLong(buffer: Buffer): DecodedBigInt {
  return {
    remaining: buffer.subarray(8),
    value: buffer.readBigUInt64LE(),
  }
}

export function decodeShort(buffer: Buffer): DecodedNumber {
  return {
    remaining: buffer.subarray(2),
    value: buffer.readInt16LE(),
  }
}

export function decodeString(buffer: Buffer): DecodedString {
  const terminator: number = buffer.indexOf(0)

  return {
    remaining: buffer.subarray(increment(terminator)),
    value: buffer.subarray(0, terminator).toString(),
  }
}
