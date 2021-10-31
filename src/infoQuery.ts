import type { Query } from './query'
import { Buffer } from 'node:buffer'
import query from './query'

function createRequest(challenge?: Buffer): Buffer {
  return Buffer.concat([
    Buffer.alloc(4, 0xff),
    Buffer.from([0x54]),
    Buffer.from('Source Engine Query\0'),
    ...(challenge ? [challenge] : []),
  ])
}

function parseChallenge({ message, size }: Query): Buffer | undefined {
  return size <= 9 && message.includes(0x41)
    ? Buffer.from(message.subarray(-4))
    : undefined
}

export default async function infoQuery(props: {
  address?: string
  port?: number
}): Promise<Query> {
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
