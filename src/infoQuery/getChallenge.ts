import type { Predicate } from 'dechainer'
import type { Query } from '../query'
import { strictEquality } from 'dechainer'
import {
  decodeInfoQueryInitial,
  decoderIntentsInitial as intents,
} from './decodeInfoQuery'

const isReflectionHardened: Predicate<number> = strictEquality(9)

export default function getChallenge({
  message,
  size,
}: Query): number | undefined {
  return !isReflectionHardened(size)
    ? undefined
    : decodeInfoQueryInitial({
        intents,
        remaining: message,
      }).challenge
}
