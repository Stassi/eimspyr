import type { DecodedInfoResult } from './decodeInfoQuery'
import type { Destination } from '../query'
import type { InfoMessage, InfoResponseFlat } from './flattenInfoResponses'
import type { LatencyStatistics } from './latencyStatistics'
import { map, race } from 'dechainer'
import decodeInfoQuery from './decodeInfoQuery'
import flattenInfoResponses from './flattenInfoResponses'
import lastElement from '../utility/lastElement'
import latencyStatistics from './latencyStatistics'
import sendInfoQueries from './sendInfoQueries'
import withNegativeAndPositiveOffset from '../utility/withNegativeAndPositiveOffset'

type WithTimeoutProp<T> = T & { timeout: number }
type InfoRequest = WithTimeoutProp<Destination>

export type InfoQuery = Omit<
  DecodedInfoResult,
  'packetSplit' | 'responseType'
> & {
  request: InfoRequest
  response: InfoResponseFlat & {
    latency: LatencyStatistics
    packetSplit: boolean
    reflectionHardened: boolean
    type: string
  }
}

export type InfoQueryOptions = Destination &
  Partial<WithTimeoutProp<{ portTolerance: number }>>

async function infoQueryContender({
  timeout,
  ...destination
}: InfoRequest): Promise<InfoQuery> {
  const response: InfoResponseFlat = flattenInfoResponses(
      await sendInfoQueries(destination)
    ),
    { challenge, messages }: InfoResponseFlat = response,
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
      ...response,
      packetSplit,
      latency: latencyStatistics(messages),
      reflectionHardened: Boolean(challenge),
      type: responseType,
    },
  }
}

function infoQuery({
  address,
  port: portProp,
  portTolerance = 1,
  timeout = 3000,
}: InfoQueryOptions): Promise<InfoQuery> {
  return Promise.race(
    map(
      (port: number) =>
        race({
          timeout,
          contender: infoQueryContender({
            address,
            port,
            timeout,
          }),
        }),
      withNegativeAndPositiveOffset({ offset: portTolerance, value: portProp })
    )
  )
}

export default infoQuery
