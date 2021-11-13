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

type StringIndexed<Value> = { readonly [p: string]: Value }

type OperatingSystems = 'Linux' | 'macOS' | 'Windows'
type ResponseTypes = 'A2S_INFO'
type ServerTypes = 'dedicated' | 'local' | 'proxy'

type InfoResultRaw = Omit<
  InfoResultNonPredicated & InfoResultPredicated,
  'remaining'
>

export type DecodedInfoResult = Omit<
  InfoResultRaw,
  | 'antiCheat'
  | 'appID'
  | 'environment'
  | 'header'
  | 'headerInfo'
  | 'platformIDLong'
  | 'platformIDShort'
  | 'serverType'
  | 'visibility'
> & {
  antiCheat: boolean
  appID: string
  operatingSystem: OperatingSystems
  packetSplit: boolean
  passwordRequired: boolean
  platformID: string
  responseType: ResponseTypes
  serverType: ServerTypes
}

const m = 'macOS',
  operatingSystems: StringIndexed<OperatingSystems> = {
    m,
    l: 'Linux',
    o: m,
    w: 'Windows',
  },
  packetSplit: StringIndexed<boolean> = {
    '-1': false,
    '-2': true,
  },
  responseTypes: StringIndexed<ResponseTypes> = {
    I: 'A2S_INFO',
  },
  serverTypes: StringIndexed<ServerTypes> = {
    d: 'dedicated',
    l: 'local',
    p: 'proxy',
  }

export default function decodeInfoQuery(message: Buffer): DecodedInfoResult {
  const {
      extraDataFlag,
      remaining,
      ...nonPredicated
    }: InfoResultNonPredicated = infoResultNonPredicated({
      remaining: message,
      intents: intentsNonPredicated,
    }),
    { remaining: _remaining, ...predicated }: InfoResultPredicated =
      infoResultPredicated({
        extraDataFlag,
        remaining,
        intents: intentsPredicated,
      }),
    {
      antiCheat,
      appID,
      environment,
      header,
      headerInfo,
      platformIDLong,
      platformIDShort,
      serverType,
      visibility,
      ...rawResult
    }: InfoResultRaw = {
      extraDataFlag,
      ...nonPredicated,
      ...predicated,
    }

  return {
    ...rawResult,
    antiCheat: Boolean(antiCheat),
    appID: `${appID}`,
    operatingSystem: operatingSystems[environment],
    packetSplit: packetSplit[header],
    passwordRequired: Boolean(visibility),
    platformID: `${platformIDLong ? platformIDLong : platformIDShort}`,
    responseType: responseTypes[headerInfo],
    serverType: serverTypes[serverType],
  }
}
