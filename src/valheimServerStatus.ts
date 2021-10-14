import type { QueryResult } from 'gamedig'
import gamedig from 'gamedig'

export default function valheimServerStatus(
  host: string,
  port: number = 10011
): Promise<QueryResult> {
  return gamedig.query({
    // @ts-ignore
    type: 'valheim',
    givenPortOnly: true,
    host,
    port,
  })
}
