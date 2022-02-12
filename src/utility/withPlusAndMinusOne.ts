import type { NumberCallback } from 'dechainer'
import { add, identity, map, subtract } from 'dechainer'

export default function withPlusAndMinusOne(param: number): number[] {
  return map(
    (fn: NumberCallback): number => fn(param),
    [subtract(1), identity, add(1)]
  )
}
