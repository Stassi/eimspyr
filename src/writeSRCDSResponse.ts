import { Buffer } from 'node:buffer'

export type Encoded = { buffer: Buffer; size: number }

export function writeCharacter(s: string): Encoded {
  const buffer: Buffer = Buffer.allocUnsafe(1)

  return {
    buffer,
    size: buffer.writeUInt8(s.charCodeAt(0)),
  }
}

export function writeLong(n: number): Encoded {
  const buffer: Buffer = Buffer.allocUnsafe(4)

  return {
    buffer,
    size: buffer.writeInt32LE(n),
  }
}

export function writeString(s: string): Encoded {
  const terminated: string = `${s}\0`
  const buffer: Buffer = Buffer.allocUnsafe(terminated.length)

  return {
    buffer,
    size: buffer.write(terminated),
  }
}
