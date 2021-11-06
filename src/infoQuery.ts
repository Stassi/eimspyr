import type { Query } from './query'
import { Buffer } from 'node:buffer'
import query from './query'
import { writeCharacter, writeLong, writeString } from './transcoder/encoder'

function createRequest(challenge?: Buffer): Buffer {
  return Buffer.concat([
    writeLong(-1).buffer,
    writeCharacter('T').buffer,
    writeString('Source Engine Query').buffer,
    ...(challenge ? [challenge] : []),
  ])
}

function parseChallenge({ message, size }: Query): Buffer | undefined {
  return size <= 9 && message.includes(0x41)
    ? Buffer.from(message.subarray(-4))
    : undefined
}

export default async function infoQuery(
  props: Partial<{
    address: string
    port: number
  }>
): Promise<Query> {
  const initialQuery: Query = await query({
    message: createRequest(),
    ...props,
  })

  const challenge: Buffer | undefined = parseChallenge(initialQuery)

  return challenge
    ? await query({
        message: createRequest(challenge),
        ...props,
      })
    : initialQuery
}
