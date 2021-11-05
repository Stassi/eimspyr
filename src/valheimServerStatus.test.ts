import pkg from '../package.json'
import valheimServerStatus from './__mocks__/valheimServerStatus'
import zeroPlayersResponse from './mockedResponses/zeroPlayersGameDig'

const { sampleHost: host } = pkg

describe('valheimServerStatus', () => {
  it('should return the server status', async () => {
    expect(await valheimServerStatus(host)).toEqual(zeroPlayersResponse)
  })
})
