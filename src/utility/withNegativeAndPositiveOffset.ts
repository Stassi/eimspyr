import type { NumberCallback } from 'dechainer'
import { add, identity, map, subtract } from 'dechainer'

export default function withNegativeAndPositiveOffset({
  offset,
  value,
}: {
  offset: number
  value: number
}): number[] {
  return map(
    (fn: NumberCallback): number => fn(value),
    offset === 0 ? [identity] : [subtract(offset), identity, add(offset)]
  )
}
