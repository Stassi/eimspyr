import type { Buffer } from 'buffer'

export type InfoResultDecoded<T> = T & { remaining: Buffer }
