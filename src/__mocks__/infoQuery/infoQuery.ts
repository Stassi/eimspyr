import type { InfoQuery, InfoQueryOptions } from '../../infoQuery'
import { jest } from '@jest/globals'
import originalInfoQuery from '../../infoQuery'
import zeroPlayersInfoQuery from '../../mockedResponses/zeroPlayersInfoQuery'

const remoteQueryPort = 10011,
  infoQuery = <jest.MockedFunction<typeof originalInfoQuery>>jest
    .fn(
      ({
        port,
        portTolerance,
        timeout,
      }: InfoQueryOptions): Promise<InfoQuery> => {
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
      }
    )
    .mockName('infoQuery')

export default infoQuery
