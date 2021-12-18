import type { InfoQuery } from '../infoQuery'

const zeroPlayersInfoQuery: InfoQuery = {
  antiCheat: false,
  appID: '892970',
  bots: 0,
  extraDataFlag: 177,
  folder: 'valheim',
  game: '',
  keywords: '0.204.4',
  map: 'hX.Valheim',
  operatingSystem: 'Linux',
  passwordRequired: true,
  platformID: '90152919696582659',
  players: 0,
  playersMax: 64,
  port: 10010,
  protocolVersion: 17,
  response: {
    address: '95.156.194.254',
    challenge: 1404011430,
    family: 'IPv4',
    messages: [
      {
        latency: 55,
        message: Buffer.from([255, 255, 255, 255, 65, 22, 92, 45, 203]),
        size: 9,
      },
      {
        latency: 44,
        message: Buffer.from([
          255, 255, 255, 255, 73, 17, 104, 88, 46, 86, 97, 108, 104, 101, 105,
          109, 0, 104, 88, 46, 86, 97, 108, 104, 101, 105, 109, 0, 118, 97, 108,
          104, 101, 105, 109, 0, 0, 0, 0, 3, 64, 0, 100, 108, 1, 0, 49, 46, 48,
          46, 48, 46, 48, 0, 177, 26, 39, 7, 236, 200, 50, 100, 73, 64, 1, 48,
          46, 50, 48, 51, 46, 49, 49, 0, 42, 160, 13, 0, 0, 0, 0, 0,
        ]),
        size: 82,
      },
    ],
    packetSplit: false,
    port: 10011,
    type: 'A2S_INFO',
  },
  serverName: 'hX.Valheim',
  serverType: 'dedicated',
  serverVersion: '1.0.0.0',
}

export default zeroPlayersInfoQuery
