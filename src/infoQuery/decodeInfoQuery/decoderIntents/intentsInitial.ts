import type { DecoderIntent } from './DecoderIntent'
import { decodeCharacter, decodeLong } from '../../../transcoder'

export type DecoderIntentInitial = DecoderIntent<
  'challenge' | 'header' | 'headerInfo'
>

const intentsInitial: DecoderIntentInitial[] = [
  {
    decoder: decodeLong,
    name: 'header',
  },
  {
    decoder: decodeCharacter,
    name: 'headerInfo',
  },
  {
    decoder: decodeLong,
    name: 'challenge',
  },
]

export default intentsInitial
