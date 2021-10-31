import type { Query } from './query'
import infoQuery from './infoQuery'

describe('SRCDS info query', () => {
  it('should return the server status', async () => {
    const res: Query = await infoQuery({
      address: '95.156.194.254',
      port: 10011,
    })

    expect(res).toEqual(true)
  })
})
