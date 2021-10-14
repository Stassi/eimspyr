import type { QueryOptions, QueryResult, Type as QueryType } from 'gamedig'
import gamedig from 'gamedig'

function serverStatus(
  options: Omit<QueryOptions, 'type'> & { type: QueryType | 'valheim' }
): Promise<QueryResult> {
  return gamedig.query(<QueryOptions>options)
}

export default function valheimServerStatus(
  host: string,
  port: number = 10011
): Promise<QueryResult> {
  return serverStatus({
    givenPortOnly: true,
    type: 'valheim',
    host,
    port,
  })
}
