import type { DecodedInfoResult } from './decodeInfoQuery'
import type { InfoResultInitial } from './infoResults'
import { initial as decodeInfoQueryInitial } from './infoResults'
import { initial as decoderIntentsInitial } from './decoderIntents'
import decodeInfoQuery from './decodeInfoQuery'

export type { DecodedInfoResult, InfoResultInitial }
export { decodeInfoQueryInitial, decoderIntentsInitial }
export default decodeInfoQuery
