import type { Query } from '../query'
import { jest } from '@jest/globals'
import mockedThreePlayersInfoQuery from '../mockedResponses/threePlayersInfoQuery'
import originalInfoQuery from '../infoQuery'

const infoQuery = <jest.MockedFunction<typeof originalInfoQuery>>jest
  .fn(
    (_param: Partial<{ address: string; port: number }>): Promise<Query> =>
      Promise.resolve({
        address: '95.156.194.254',
        family: 'IPv4',
        message: mockedThreePlayersInfoQuery,
        port: 10011,
        size: 82,
      })
  )
  .mockName('infoQuery')

export default infoQuery
