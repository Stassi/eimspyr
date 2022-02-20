import { Datagram } from '../datagram'

export type InfoMessage = Pick<Datagram, 'latency' | 'message' | 'size'>

type WithInfoMessages<T> = T & {
  messages: InfoMessage[]
}

export type InfoResponseFlat = WithInfoMessages<
  Pick<Datagram, 'address' | 'family' | 'port'>
>

export default function flattenInfoResponses(
  responses: Datagram[]
): InfoResponseFlat {
  return <InfoResponseFlat>responses.reduce(
    (
      { messages }: WithInfoMessages<Partial<Datagram>>,
      { latency, message, size, ...props }: Datagram
    ) => ({
      ...props,
      messages: [...messages, { latency, message, size }],
    }),
    { messages: [] }
  )
}
