import type { Socket } from 'dgram'
import { createSocket } from 'dgram'
import { Buffer } from 'buffer'
import handleUDPSocketError from './handleUDPSocketError'

export type RemoteDestinationContender = {
  address: string
  port: number
}

export type RemoteInfo = RemoteDestinationContender & {
  family: string
  size: number
}

export function createUDPSocket({
  duration,
  resolve,
  reject,
}: {
  duration: () => number
  resolve: (x: any) => unknown
  reject: (error: Error) => void
}): Socket {
  const socket: Socket = createSocket('udp4')

  socket
    .once(
      'error',
      handleUDPSocketError({
        reject,
        socket,
      })
    )
    .once('message', (message: Buffer, remoteInfo: RemoteInfo): void => {
      socket.close()
      resolve({
        message,
        latency: duration(),
        ...remoteInfo,
      })
    })

  return socket
}
