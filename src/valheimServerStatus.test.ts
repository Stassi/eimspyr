import valheimServerStatus from './__mocks__/valheimServerStatus'
import zeroPlayersResponse from './mockedResponses/zeroPlayersGameDig'

describe('valheimServerStatus', () => {
  it('should return the server status', async () => {
    expect(await valheimServerStatus('95.156.194.254')).toEqual(
      zeroPlayersResponse
    )
  })
})
