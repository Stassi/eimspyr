import type { InfoResponseTall } from './sendInfoQueries'

export type InfoMessage = Pick<InfoResponseTall, 'latency' | 'message' | 'size'>

type WithInfoMessages<T> = T & {
  messages: InfoMessage[]
}

export type InfoResponseFlat = WithInfoMessages<
  Pick<InfoResponseTall, 'address' | 'challenge' | 'family' | 'port'>
>

export default function flattenInfoResponses(
  responses: InfoResponseTall[]
): InfoResponseFlat {
  return <InfoResponseFlat>responses.reduce(
    (
      { challenge, messages }: WithInfoMessages<Partial<InfoResponseTall>>,
      { latency, message, size, ...props }: InfoResponseTall
    ) => ({
      ...props,
      ...(challenge ? { challenge } : {}),
      messages: [...messages, { latency, message, size }],
    }),
    { messages: [] }
  )
}
