import type { Socket } from 'node:dgram'
import { createSocket } from 'node:dgram'
import { Buffer } from 'node:buffer'
import handleUDPSocketError from './handleUDPSocketError'

export type RemoteInfo = {
  address: string
  family: string
  port: number
  size: number
}

export function createUDPSocket({
  resolve,
  reject,
}: {
  resolve: (x: any) => unknown
  reject: (error: Error) => void
}): Socket {
  const socket: Socket = createSocket('udp4')

  socket
    .on(
      'error',
      handleUDPSocketError({
        reject,
        socket,
      })
    )
    .on('message', (message: Buffer, remoteInfo: RemoteInfo): void => {
      socket.close()
      resolve({
        message,
        ...remoteInfo,
      })
    })

  return socket
}
