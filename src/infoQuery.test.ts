import type { RemoteDestination } from './query'
import infoQuery from './__mocks__/infoQuery'
import zeroPlayersInfoQuery from './mockedResponses/zeroPlayersInfoQuery'

describe('A2S_INFO query', () => {
  describe('Valheim dedicated server', () => {
    const valheimDedicatedServer: RemoteDestination = {
      address: '95.156.194.254',
      port: 10011,
    }

    it('should return the server status', async () => {
      expect(await infoQuery(valheimDedicatedServer)).toEqual(
        zeroPlayersInfoQuery
      )
    })
  })
})
