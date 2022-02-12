import type { DecodedInfoResult } from './decodeInfoQuery'
import type { Destination } from '../query'
import type { InfoMessage, InfoResponseFlat } from './flattenInfoResponses'
import type { LatencyStatistics } from './latencyStatistics'
import { race } from 'dechainer'
import decodeInfoQuery from './decodeInfoQuery'
import flattenInfoResponses from './flattenInfoResponses'
import lastElement from '../utility/lastElement'
import latencyStatistics from './latencyStatistics'
import sendInfoQueries from './sendInfoQueries'

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
  Partial<WithTimeoutProp<{ exactPort: boolean }>>

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
  exactPort = false,
  timeout = 3000,
  ...destination
}: InfoQueryOptions): Promise<InfoQuery> {
  if (!exactPort) throw new Error('Port approximation feature not implemented.')

  return race({
    timeout,
    contender: infoQueryContender({ timeout, ...destination }),
  })
}

export default infoQuery
