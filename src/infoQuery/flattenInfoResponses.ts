import type { InfoResponseTall } from './sendInfoQueries'

type WithMessages<T> = T & {
  messages: Pick<InfoResponseTall, 'latency' | 'message' | 'size'>[]
}

export type InfoResponseFlat = WithMessages<
  Pick<InfoResponseTall, 'address' | 'challenge' | 'family' | 'port'>
>

export default function flattenInfoResponses(
  responses: InfoResponseTall[]
): InfoResponseFlat {
  return <InfoResponseFlat>responses.reduce(
    (
      { challenge, messages }: WithMessages<Partial<InfoResponseTall>>,
      { latency, message, size, ...props }: InfoResponseTall
    ) => ({
      ...props,
      ...(challenge ? { challenge } : {}),
      messages: [...messages, { latency, message, size }],
    }),
    { messages: [] }
  )
}
