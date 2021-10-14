import { jest } from '@jest/globals'
import mockedZeroPlayersResponse from '../mockedResponses/zeroPlayers'
import originalValheimServerStatus from '../valheimServerStatus'

const valheimServerStatus = jest
  .fn((_host: string, _port?: number) =>
    Promise.resolve(mockedZeroPlayersResponse)
  )
  .mockName('valheimServerStatus') as jest.MockedFunction<
  typeof originalValheimServerStatus
>

export default valheimServerStatus
