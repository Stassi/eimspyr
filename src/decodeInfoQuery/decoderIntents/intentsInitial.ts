import type { ReaderIntent } from './ReaderIntent'
import { readCharacter, readLong } from '../../transcoder'

export type DecoderIntentInitial = ReaderIntent<
  'challenge' | 'header' | 'headerInfo'
>

const intentsInitial: DecoderIntentInitial[] = [
  {
    name: 'header',
    reader: readLong,
  },
  {
    name: 'headerInfo',
    reader: readCharacter,
  },
  {
    name: 'challenge',
    reader: readLong,
  },
]

export default intentsInitial
