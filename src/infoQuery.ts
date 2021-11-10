import type { Encoded } from './transcoder'
import type { InfoResultInitial } from './decodeInfoQuery'
import type { Query } from './query'
import { Buffer } from 'node:buffer'
import {
  decodeInfoQueryInitial,
  decoderIntentsInitial as intents,
} from './decodeInfoQuery'
import query from './query'
import { writeCharacter, writeLong, writeString } from './transcoder'

const message: Buffer = Buffer.concat(
  [writeLong(-1), writeCharacter('T'), writeString('Source Engine Query')].map(
    ({ buffer }: Encoded) => buffer
  )
)

export default async function infoQuery(
  props: Partial<{
    address: string
    port: number
  }>
): Promise<Query[]> {
  const initialQuery: Query = await query({
      message,
      ...props,
    }),
    { message: remaining }: Query = initialQuery,
    { challenge, headerInfo }: InfoResultInitial = decodeInfoQueryInitial({
      intents,
      remaining,
    })

  return [
    initialQuery,
    ...(headerInfo === 'A'
      ? [
          await query({
            message: Buffer.concat([message, writeLong(challenge).buffer]),
            ...props,
          }),
        ]
      : []),
  ]
}
