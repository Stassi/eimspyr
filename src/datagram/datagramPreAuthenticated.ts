import type { Socket } from 'dgram'
import type { RemoteInfo } from './createUDPSocket'
import { Buffer } from 'buffer'
import { durationTimer } from 'dechainer'
import { createUDPSocket } from './createUDPSocket'
import handleUDPSocketError from './handleUDPSocketError'

type WithMessageProp<T> = T & { message: Buffer }

export type Datagram = WithMessageProp<
  RemoteInfo & {
    latency: number
  }
>

export default function datagramPreAuthenticated({
  address,
  message,
  port,
}: WithMessageProp<
  Partial<{ address: string; port: number }>
>): Promise<Datagram> {
  return new Promise(
    (resolve: (x: any) => unknown, reject: (error: Error) => void) => {
      const socket: Socket = createUDPSocket({
        resolve,
        reject,
        duration: durationTimer(),
      })

      socket.send(
        message,
        port,
        address,
        handleUDPSocketError({
          reject,
          socket,
        })
      )
    }
  )
}
