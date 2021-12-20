import { decrement, indexOf, length } from 'dechainer'

export default function lastElement<T>(arr: T[]): T {
  return indexOf(arr, decrement(length(arr)))
}
