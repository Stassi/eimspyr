import type { ReaderIntent } from './ReaderIntent'
import { decodeCharacter, decodeLong } from '../../../transcoder'

export type DecoderIntentInitial = ReaderIntent<
  'challenge' | 'header' | 'headerInfo'
>

const intentsInitial: DecoderIntentInitial[] = [
  {
    name: 'header',
    reader: decodeLong,
  },
  {
    name: 'headerInfo',
    reader: decodeCharacter,
  },
  {
    name: 'challenge',
    reader: decodeLong,
  },
]

export default intentsInitial
