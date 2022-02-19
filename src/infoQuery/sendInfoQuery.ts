import type { Encoded } from '../transcoder'
import type { Destination, Query } from '../query'
import { Buffer } from 'buffer'
import query from '../query'
import { encodeCharacter, encodeLong, encodeString } from '../transcoder'

export type WithAnyChallengeProp<T> = T & Partial<{ challenge: number }>

const message: Buffer = Buffer.concat(
  [
    encodeLong(-1),
    encodeCharacter('T'),
    encodeString('Source Engine Query'),
  ].map(({ buffer }: Encoded) => buffer)
)

export default function sendInfoQuery({
  challenge,
  destination,
}: WithAnyChallengeProp<{
  destination: Destination
}>): Promise<Query> {
  return query({
    message: challenge
      ? Buffer.concat([message, encodeLong(challenge).buffer])
      : message,
    ...destination,
  })
}
