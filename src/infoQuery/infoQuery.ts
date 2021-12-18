import type { DecodedInfoResult } from './decodeInfoQuery'
import type { InfoResponseFlat } from './flattenInfoResponses'
import type { LatencyStatistics } from './latencyStatistics'
import type { RemoteDestinationContender } from '../query'
import { race } from 'dechainer'
import decodeInfoQuery from './decodeInfoQuery'
import flattenInfoResponses from './flattenInfoResponses'
import latencyStatistics from './latencyStatistics'
import sendInfoQueries from './sendInfoQueries'

export type InfoQuery = Omit<
  DecodedInfoResult,
  'packetSplit' | 'responseType'
> & {
  response: InfoResponseFlat & {
    latency: LatencyStatistics
    packetSplit: boolean
    type: string
  }
}

export type RemoteDestination = RemoteDestinationContender & {
  timeout?: number
}

async function infoQueryContender(
  destination: RemoteDestinationContender
): Promise<InfoQuery> {
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
    response: {
      ...response,
      packetSplit,
      latency: latencyStatistics(response),
      type: responseType,
    },
  }
}

function infoQuery({ timeout = 3000, ...props }: RemoteDestination) {
  return race({ timeout, contender: infoQueryContender(props) })
}

export default infoQuery
