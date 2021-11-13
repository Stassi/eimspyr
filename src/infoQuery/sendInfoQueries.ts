import type { Encoded } from '../transcoder'
import type { InfoResultInitial } from './decodeInfoQuery'
import type { Query, RemoteDestination } from '../query'
import { Buffer } from 'node:buffer'
import { encodeCharacter, encodeLong, encodeString } from '../transcoder'
import {
  decodeInfoQueryInitial,
  decoderIntentsInitial as intents,
} from './decodeInfoQuery'
import query from '../query'

export type InfoResponseTall = Query & Partial<{ challenge: number }>

const message: Buffer = Buffer.concat(
  [
    encodeLong(-1),
    encodeCharacter('T'),
    encodeString('Source Engine Query'),
  ].map(({ buffer }: Encoded) => buffer)
)

export default async function sendInfoQueries(
  destination: RemoteDestination
): Promise<InfoResponseTall[]> {
  const initialQuery: Query = await query({
      message,
      ...destination,
    }),
    { size, message: remaining }: Query = initialQuery,
    isChallenge: boolean = size === 9

  if (!isChallenge) {
    return [initialQuery]
  } else {
    const { challenge }: InfoResultInitial = decodeInfoQueryInitial({
      intents,
      remaining,
    })

    return [
      { ...initialQuery, challenge },
      await query({
        message: Buffer.concat([message, encodeLong(challenge).buffer]),
        ...destination,
      }),
    ]
  }
}
