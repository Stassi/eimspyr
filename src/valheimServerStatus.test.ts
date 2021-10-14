import valheimServerStatus from './__mocks__/valheimServerStatus'
import zeroPlayersResponse from './mockedResponses/zeroPlayers'

const host: string = '95.156.194.254'

describe('valheimServerStatus', () => {
  it('should return the server status', async () => {
    expect(await valheimServerStatus(host)).toEqual(zeroPlayersResponse)
  })
})
