import type { DecodedInfoResult } from './decodeInfoQuery'
import type { InfoResponseFlat } from './flattenInfoResponses'
import type { LatencyStatistics } from './latencyStatistics'
import type { RemoteDestinationContender } from '../query'
import { race } from 'dechainer'
import decodeInfoQuery from './decodeInfoQuery'
import flattenInfoResponses from './flattenInfoResponses'
import latencyStatistics from './latencyStatistics'
import sendInfoQueries from './sendInfoQueries'

type TimeoutProp = { timeout: number }
type WithTimeout<T> = T & TimeoutProp
type WithTimeoutMaybe<T> = T & Partial<TimeoutProp>
type InfoRequest = WithTimeout<RemoteDestinationContender>

export type InfoQuery = Omit<
  DecodedInfoResult,
  'packetSplit' | 'responseType'
> & {
  request: InfoRequest
  response: InfoResponseFlat & {
    latency: LatencyStatistics
    packetSplit: boolean
    type: string
  }
}

export type RemoteDestination = WithTimeoutMaybe<RemoteDestinationContender>

async function infoQueryContender({
  timeout,
  ...destination
}: InfoRequest): Promise<InfoQuery> {
  const response: InfoResponseFlat = flattenInfoResponses(
      await sendInfoQueries(destination)
    ),
    {
      messages: [, { message }],
    }: InfoResponseFlat = response,
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
      latency: latencyStatistics(response),
      type: responseType,
    },
  }
}

function infoQuery({
  timeout = 3000,
  ...destination
}: RemoteDestination): Promise<InfoQuery> {
  return race({
    timeout,
    contender: infoQueryContender({ timeout, ...destination }),
  })
}

export default infoQuery
