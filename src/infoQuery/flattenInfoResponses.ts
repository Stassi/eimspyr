import { Query } from '../query'

export type InfoMessage = Pick<Query, 'latency' | 'message' | 'size'>

type WithInfoMessages<T> = T & {
  messages: InfoMessage[]
}

export type InfoResponseFlat = WithInfoMessages<
  Pick<Query, 'address' | 'family' | 'port'>
>

export default function flattenInfoResponses(
  responses: Query[]
): InfoResponseFlat {
  return <InfoResponseFlat>responses.reduce(
    (
      { messages }: WithInfoMessages<Partial<Query>>,
      { latency, message, size, ...props }: Query
    ) => ({
      ...props,
      messages: [...messages, { latency, message, size }],
    }),
    { messages: [] }
  )
}
