import type { Socket } from 'dgram'

export default function handleUDPSocketError({
  reject,
  socket,
}: {
  reject: (error: Error) => void
  socket: Socket
}): (error: Error | null) => void {
  return (error: Error | null): void => {
    if (error) {
      socket.close()
      reject(error)
    }
  }
}
