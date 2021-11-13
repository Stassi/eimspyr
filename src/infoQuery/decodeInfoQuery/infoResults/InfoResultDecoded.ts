import type { Buffer } from 'node:buffer'

export type InfoResultDecoded<T> = T & { remaining: Buffer }
