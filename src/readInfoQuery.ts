import type { InfoResultNonPredicated } from './infoResultNonPredicated'
import type { InfoResultPredicated } from './infoResultPredicated'
import { Buffer } from 'node:buffer'
import nonPredicatedInfoResult from './infoResultNonPredicated'
import predicatedInfoResult from './infoResultPredicated'
import {
  nonPredicated as intentsNonPredicated,
  predicated as intentsPredicated,
} from './decoderIntents'

export type InfoResultBig = Omit<
  InfoResultNonPredicated & InfoResultPredicated,
  'remaining'
>

export default function readInfoQuery(message: Buffer): InfoResultBig {
  const {
    extraDataFlag,
    remaining,
    ...nonPredicatedRes
  }: InfoResultNonPredicated = nonPredicatedInfoResult({
    remaining: message,
    intents: intentsNonPredicated,
  })

  const { remaining: _remaining, ...predicatedRes }: InfoResultPredicated =
    predicatedInfoResult({
      extraDataFlag,
      remaining,
      intents: intentsPredicated,
    })

  return {
    extraDataFlag,
    ...nonPredicatedRes,
    ...predicatedRes,
  }
}
