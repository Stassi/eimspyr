import type { InfoQuery, InfoQueryOptions } from '../../infoQuery'
import { jest } from '@jest/globals'
import originalInfoQuery from '../../infoQuery'
import zeroPlayersInfoQuery from '../../mockedResponses/zeroPlayersInfoQuery'

const infoQuery = <jest.MockedFunction<typeof originalInfoQuery>>jest
  .fn(({ timeout }: InfoQueryOptions): Promise<InfoQuery> => {
    return timeout === 0
      ? Promise.reject(() => {
          throw new RangeError('Timeout after 0 ms')
        })
      : Promise.resolve(zeroPlayersInfoQuery)
  })
  .mockName('infoQuery')

export default infoQuery
