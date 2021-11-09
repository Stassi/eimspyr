import type {
  InfoResultNonPredicated,
  InfoResultPredicated,
} from './infoResults'
import { Buffer } from 'node:buffer'
import {
  nonPredicated as intentsNonPredicated,
  predicated as intentsPredicated,
} from './decoderIntents'
import {
  nonPredicated as infoResultNonPredicated,
  predicated as infoResultPredicated,
} from './infoResults'

export type InfoResultBig = Omit<
  InfoResultNonPredicated & InfoResultPredicated,
  'remaining'
>

export default function decodeInfoQuery(message: Buffer): InfoResultBig {
  const {
    extraDataFlag,
    remaining,
    ...nonPredicated
  }: InfoResultNonPredicated = infoResultNonPredicated({
    remaining: message,
    intents: intentsNonPredicated,
  })

  const { remaining: _remaining, ...predicated }: InfoResultPredicated =
    infoResultPredicated({
      extraDataFlag,
      remaining,
      intents: intentsPredicated,
    })

  return {
    extraDataFlag,
    ...nonPredicated,
    ...predicated,
  }
}
