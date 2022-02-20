import type { Datagram } from './datagramPreAuthenticated'
import type { Destination } from './createUDPSocket'
import { Buffer } from 'buffer'
import datagramPreAuthenticated from './datagramPreAuthenticated'
import { encodeLong } from '../transcoder'

export type WithAnyChallengeProp<T> = T & Partial<{ challenge: number }>

export default function datagram({
  challenge,
  destination,
  message,
}: WithAnyChallengeProp<{
  destination: Destination
  message: Buffer
}>): Promise<Datagram> {
  return datagramPreAuthenticated({
    message: challenge
      ? Buffer.concat([message, encodeLong(challenge).buffer])
      : message,
    ...destination,
  })
}
