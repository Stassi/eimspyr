import type { InfoResponseTall } from './sendInfoQueries'

export type InfoMessage = { message: Buffer; size: number } & Partial<{
  challenge: number
}>

export type InfoResponseFlat = Omit<InfoResponseTall, 'message' | 'size'> & {
  messages: InfoMessage[]
}

export default function flattenInfoResponses(
  responses: InfoResponseTall[]
): InfoResponseFlat {
  return <InfoResponseFlat>responses.reduce(
    (
      {
        challenge,
        messages,
        ...prevProps
      }: { messages: InfoMessage[] } & Partial<InfoResponseTall>,
      { message, size, ...props }: InfoResponseTall
    ) => ({
      ...props,
      ...(challenge ? { challenge } : {}),
      messages: [...messages, { message, size }],
    }),
    { messages: [] }
  )
}
