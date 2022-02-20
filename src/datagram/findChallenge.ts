import type { Datagram } from './datagramPreAuthenticated'
import type { Predicate } from 'dechainer'
import { strictEquality } from 'dechainer'
import {
  decodeInfoQueryInitial,
  decoderIntentsInitial as intents,
} from '../query/decodeInfoQuery'

const isReflectionHardened: Predicate<number> = strictEquality(9)

export default function findChallenge({
  message,
  size,
}: Datagram): number | undefined {
  return !isReflectionHardened(size)
    ? undefined
    : decodeInfoQueryInitial({
        intents,
        remaining: message,
      }).challenge
}
