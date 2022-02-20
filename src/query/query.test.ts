import type { NumberCallback } from 'dechainer'
import { add, negate } from 'dechainer'
import expected from '../mockedResponses/zeroPlayersInfoQuery'
import query from '../__mocks__/query/query'

describe('query', () => {
  describe('address: 95.156.194.254', () => {
    const address = '95.156.194.254',
      port = 10011,
      portOffset: NumberCallback = add(port)

    describe('port tolerance: 0', () => {
      const portTolerance = 0

      describe('port offset: ±0', () => {
        it('should return the server status', async () => {
          expect(
            await query({
              address,
              portTolerance,
              port: portOffset(0),
            })
          ).toEqual(expected)
        })
      })

      describe('port offset: -1', () => {
        it('should throw a RangeError', async () => {
          await expect(
            query({
              address,
              portTolerance,
              port: portOffset(negate(1)),
            })
          ).rejects.toThrow(new RangeError('Timeout after 3000 ms'))
        })
      })

      describe('port offset: +1', () => {
        it('should throw a RangeError', async () => {
          await expect(
            query({
              address,
              portTolerance,
              port: portOffset(1),
            })
          ).rejects.toThrow(new RangeError('Timeout after 3000 ms'))
        })
      })
    })

    describe('port tolerance: 1', () => {
      const portTolerance = 1

      describe('port offset: ±0', () => {
        it('should return the server status', async () => {
          expect(
            await query({
              address,
              portTolerance,
              port: portOffset(0),
            })
          ).toEqual(expected)
        })
      })

      describe('port offset: -1', () => {
        it('should return the server status', async () => {
          expect(
            await query({
              address,
              portTolerance,
              port: portOffset(negate(1)),
            })
          ).toEqual(expected)
        })
      })

      describe('port offset: +1', () => {
        it('should return the server status', async () => {
          expect(
            await query({
              address,
              portTolerance,
              port: portOffset(1),
            })
          ).toEqual(expected)
        })
      })
    })

    describe('timeout: 3000', () => {
      it('should return the server status', async () => {
        expect(
          await query({
            address,
            port,
            portTolerance: 0,
            timeout: 3000,
          })
        ).toEqual(expected)
      })
    })

    describe('timeout: 0', () => {
      it('should throw a RangeError', async () => {
        await expect(
          query({
            address,
            port,
            portTolerance: 0,
            timeout: 0,
          })
        ).rejects.toThrow(new RangeError('Timeout after 0 ms'))
      })
    })
  })
})
