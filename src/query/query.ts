import type { DecodedInfoResult } from './decodeInfoQuery'
import type { Encoded } from '../transcoder'
import type { LatencyStatistics } from './latencyStatistics'
import type { InfoMessage, InfoResponseFlat } from './flattenInfoResponses'
import type { Datagram, Destination, WithAnyChallengeProp } from '../datagram'
import { Buffer } from 'buffer'
import { map, race } from 'dechainer'
import decodeInfoQuery from './decodeInfoQuery'
import flattenInfoResponses from './flattenInfoResponses'
import lastElement from '../utility/lastElement'
import latencyStatistics from './latencyStatistics'
import withNegativeAndPositiveOffset from '../utility/withNegativeAndPositiveOffset'
import datagram, { findChallenge } from '../datagram'
import { encodeCharacter, encodeLong, encodeString } from '../transcoder'

type WithTimeoutProp<T> = T & { timeout: number }
type Request = WithTimeoutProp<Destination>

export type Query = Omit<DecodedInfoResult, 'packetSplit' | 'responseType'> & {
  request: Request
  response: WithAnyChallengeProp<
    InfoResponseFlat & {
      latency: LatencyStatistics
      packetSplit: boolean
      reflectionHardened: boolean
      type: string
    }
  >
}

export type QueryOptions = Destination &
  Partial<WithTimeoutProp<{ portTolerance: number }>>

const infoMessage: Buffer = Buffer.concat(
  [
    encodeLong(-1),
    encodeCharacter('T'),
    encodeString('Source Engine Query'),
  ].map(({ buffer }: Encoded) => buffer)
)

async function queryContender({
  timeout,
  ...destination
}: Request): Promise<Query> {
  const infoResponseInitial: Datagram = await datagram({
      destination,
      message: infoMessage,
    }),
    challenge: number | undefined = findChallenge(infoResponseInitial),
    infoResponses: Datagram[] = [
      infoResponseInitial,
      ...(!challenge
        ? []
        : [await datagram({ challenge, destination, message: infoMessage })]),
    ],
    flatInfoResponse: InfoResponseFlat = flattenInfoResponses([
      ...infoResponses,
    ]),
    { messages }: InfoResponseFlat = flatInfoResponse,
    { message }: InfoMessage = lastElement(messages),
    { packetSplit, responseType, ...decoded }: DecodedInfoResult =
      decodeInfoQuery(message)

  return {
    ...decoded,
    request: {
      timeout,
      ...destination,
    },
    response: {
      ...flatInfoResponse,
      challenge,
      packetSplit,
      latency: latencyStatistics(messages),
      reflectionHardened: Boolean(challenge),
      type: responseType,
    },
  }
}

export default function query({
  address,
  port: portProp,
  portTolerance = 1,
  timeout = 3000,
}: QueryOptions): Promise<Query> {
  return Promise.race(
    map(
      (port: number) =>
        race({
          timeout,
          contender: queryContender({
            address,
            port,
            timeout,
          }),
        }),
      withNegativeAndPositiveOffset({ offset: portTolerance, value: portProp })
    )
  )
}
