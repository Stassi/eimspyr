import type { DecodedInfoResult } from './decodeInfoQuery'
import type { InfoResponseFlat } from './flattenInfoResponses'
import type { RemoteDestination } from './query'
import decodeInfoQuery from './decodeInfoQuery'
import flattenInfoResponses from './flattenInfoResponses'
import sendInfoQueries from './sendInfoQueries'

export type InfoQuery = Omit<
  DecodedInfoResult,
  'packetSplit' | 'responseType'
> & {
  response: InfoResponseFlat & { packetSplit: boolean; type: string }
}

export default async function infoQuery(
  destination: RemoteDestination
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
      type: responseType,
    },
  }
}
