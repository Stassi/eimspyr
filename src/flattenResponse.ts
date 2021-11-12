import type { Query } from './query'

export type Message = { message: Buffer; size: number }

export type Response = Omit<Query, 'message' | 'size'> & {
  messages: Message[]
}

export default function flattenResponse(responses: Query[]): Response {
  return <Response>responses.reduce(
    (
      { messages, ...prevProps }: { messages: Message[] } & Partial<Query>,
      { message, size, ...props }: Query
    ) => ({
      ...props,
      messages: [...messages, { message, size }],
    }),
    { messages: [] }
  )
}
