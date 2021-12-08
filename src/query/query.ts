import type { Socket } from 'dgram'
import type { RemoteInfo } from './createUDPSocket'
import { Buffer } from 'buffer'
import { durationTimer } from 'dechainer'
import { createUDPSocket } from './createUDPSocket'
import handleUDPSocketError from './handleUDPSocketError'

export type Query = RemoteInfo & {
  latency: number
  message: Buffer
}

export default function query({
  address,
  message,
  port,
}: {
  address?: string
  message: Buffer
  port?: number
}): Promise<Query> {
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
