import type { NumberCallback } from 'dechainer'
import { add, negate } from 'dechainer'
import expected from '../mockedResponses/zeroPlayersInfoQuery'
import infoQuery from '../__mocks__/infoQuery/infoQuery'

describe('A2S_INFO query', () => {
  describe('address: 95.156.194.254', () => {
    const address = '95.156.194.254',
      portOffset: NumberCallback = add(10011)

    describe('port tolerance: 0', () => {
      const portTolerance = 0

      describe('port offset: ±0', () => {
        const port = portOffset(0)

        describe('timeout: 3000', () => {
          const timeout = 3000

          it('should return the server status', async () => {
            expect(
              await infoQuery({
                address,
                port,
                portTolerance,
                timeout,
              })
            ).toEqual(expected)
          })
        })

        describe('timeout: 0', () => {
          const timeout = 0

          it('should throw a RangeError', async () => {
            await expect(
              infoQuery({
                address,
                port,
                portTolerance,
                timeout,
              })
            ).rejects.toThrow(new RangeError('Timeout after 0 ms'))
          })
        })
      })

      describe('port offset: -1', () => {
        const port = portOffset(negate(1))

        describe('timeout: 3000', () => {
          const timeout = 3000

          it('should throw a RangeError', async () => {
            await expect(
              infoQuery({
                address,
                port,
                portTolerance,
                timeout,
              })
            ).rejects.toThrow(new RangeError('Timeout after 3000 ms'))
          })
        })

        describe('timeout: 0', () => {
          const timeout = 0

          it('should throw a RangeError', async () => {
            await expect(
              infoQuery({
                address,
                port,
                portTolerance,
                timeout,
              })
            ).rejects.toThrow(new RangeError('Timeout after 0 ms'))
          })
        })
      })

      describe('port offset: +1', () => {
        const port = portOffset(1)

        describe('timeout: 3000', () => {
          const timeout = 3000

          it('should throw a RangeError', async () => {
            await expect(
              infoQuery({
                address,
                port,
                portTolerance,
                timeout,
              })
            ).rejects.toThrow(new RangeError('Timeout after 3000 ms'))
          })
        })

        describe('timeout: 0', () => {
          const timeout = 0

          it('should throw a RangeError', async () => {
            await expect(
              infoQuery({
                address,
                port,
                portTolerance,
                timeout,
              })
            ).rejects.toThrow(new RangeError('Timeout after 0 ms'))
          })
        })
      })
    })

    describe('port tolerance: 1', () => {
      const portTolerance = 1

      describe('port offset: ±0', () => {
        const port = portOffset(0)

        describe('timeout: 3000', () => {
          const timeout = 3000

          it('should return the server status', async () => {
            expect(
              await infoQuery({
                address,
                port,
                portTolerance,
                timeout,
              })
            ).toEqual(expected)
          })
        })

        describe('timeout: 0', () => {
          const timeout = 0

          it('should throw a RangeError', async () => {
            await expect(
              infoQuery({
                address,
                port,
                portTolerance,
                timeout,
              })
            ).rejects.toThrow(new RangeError('Timeout after 0 ms'))
          })
        })
      })

      describe('port offset: -1', () => {
        const port = portOffset(negate(1))

        describe('timeout: 3000', () => {
          const timeout = 3000

          it('should return the server status', async () => {
            expect(
              await infoQuery({
                address,
                port,
                portTolerance,
                timeout,
              })
            ).toEqual(expected)
          })
        })

        describe('timeout: 0', () => {
          const timeout = 0

          it('should throw a RangeError', async () => {
            await expect(
              infoQuery({
                address,
                port,
                portTolerance,
                timeout,
              })
            ).rejects.toThrow(new RangeError('Timeout after 0 ms'))
          })
        })
      })

      describe('port offset: +1', () => {
        const port = portOffset(1)

        describe('timeout: 3000', () => {
          const timeout = 3000

          it('should return the server status', async () => {
            expect(
              await infoQuery({
                address,
                port,
                portTolerance,
                timeout,
              })
            ).toEqual(expected)
          })
        })

        describe('timeout: 0', () => {
          const timeout = 0

          it('should throw a RangeError', async () => {
            await expect(
              infoQuery({
                address,
                port,
                portTolerance,
                timeout,
              })
            ).rejects.toThrow(new RangeError('Timeout after 0 ms'))
          })
        })
      })
    })
  })
})
