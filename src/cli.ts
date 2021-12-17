import type { Callback, MapCallback } from 'dechainer'
import type { InfoQuery, RemoteDestination } from './infoQuery'
import { Command } from 'commander'
import { map } from 'dechainer'
import { inspect } from 'util'

const toNumber: MapCallback<string, number> = map(Number)

export function cli({
  argv,
  infoQuery,
  name,
  version,
}: {
  argv: string[]
  infoQuery: Callback<RemoteDestination, Promise<InfoQuery>>
  name: string
  version: string
}): void {
  new Command()
    .name(name)
    .version(version)
    .argument('<destination>', 'destination server address:port')
    .option('-d, --depth <number>', 'depth of response object', '2')
    .option('-t, --timeout <number>', 'timeout in milliseconds', '3000')
    .action(
      async (
        destination: string,
        {
          depth: depthString,
          timeout: timeoutString,
        }: { depth: string; timeout: string }
      ) => {
        const [address, portString] = destination.split(':')

        const [depth, port, timeout]: number[] = toNumber([
          depthString,
          portString,
          timeoutString,
        ])

        const options: RemoteDestination = { address, port, timeout }

        console.log(
          inspect(await infoQuery(options), {
            depth,
            colors: true,
          })
        )
      }
    )
    .parse(argv)
}
