import type { RemoteDestination } from './infoQuery'
import expected from '../mockedResponses/zeroPlayersInfoQuery'
import infoQuery from '../__mocks__/infoQuery/infoQuery'

describe('A2S_INFO query', () => {
  describe('Valheim dedicated server', () => {
    const valheimDedicatedServer: RemoteDestination = {
      address: '95.156.194.254',
      port: 10011,
    }

    describe('default timeout', () => {
      it('should return the server status', async () => {
        expect(await infoQuery(valheimDedicatedServer)).toEqual(expected)
      })
    })

    describe('timeout: 3000', () => {
      it('should return the server status', async () => {
        expect(
          await infoQuery({ ...valheimDedicatedServer, timeout: 3000 })
        ).toEqual(expected)
      })
    })

    describe('timeout: 0', () => {
      it('should throw a RangeError', async () => {
        await expect(
          infoQuery({
            ...valheimDedicatedServer,
            timeout: 0,
          })
        ).rejects.toThrow(new RangeError('Timeout after 0 ms'))
      })
    })
  })
})
