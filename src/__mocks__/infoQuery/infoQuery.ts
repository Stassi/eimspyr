import type { InfoQuery, RemoteDestination } from '../../infoQuery'
import { jest } from '@jest/globals'
import originalInfoQuery from '../../infoQuery'
import zeroPlayersInfoQuery from '../../mockedResponses/zeroPlayersInfoQuery'

const infoQuery = <jest.MockedFunction<typeof originalInfoQuery>>(
  jest
    .fn(
      (_param: RemoteDestination): Promise<InfoQuery> =>
        Promise.resolve(zeroPlayersInfoQuery)
    )
    .mockName('infoQuery')
)

export default infoQuery
