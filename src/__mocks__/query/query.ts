import type { Query, QueryOptions } from '../../query'
import { jest } from '@jest/globals'
import originalQuery from '../../query'
import zeroPlayersInfoQuery from '../../mockedResponses/zeroPlayersInfoQuery'

const remoteQueryPort = 10011,
  query = <jest.MockedFunction<typeof originalQuery>>jest
    .fn(({ port, portTolerance, timeout }: QueryOptions): Promise<Query> => {
      if (timeout === 0) {
        return Promise.reject(() => {
          throw new RangeError('Timeout after 0 ms')
        })
      } else if (portTolerance === 0) {
        return port === remoteQueryPort
          ? Promise.resolve(zeroPlayersInfoQuery)
          : Promise.reject(() => {
              throw new RangeError('Timeout after 3000 ms')
            })
      } else {
        return Promise.resolve(zeroPlayersInfoQuery)
      }
    })
    .mockName('infoQuery')

export default query
