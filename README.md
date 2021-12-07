# Eimspyr

![npm](https://img.shields.io/npm/v/eimspyr?style=plastic)
![GitHub](https://img.shields.io/github/license/Stassi/eimspyr?style=plastic)
![npm type definitions](https://img.shields.io/npm/types/eimspyr?style=plastic)
![node-current](https://img.shields.io/node/v/eimspyr?style=plastic)
![size repository](https://img.shields.io/github/languages/code-size/Stassi/eimspyr?style=plastic)
![size minified](https://img.shields.io/bundlephobia/min/eimspyr?style=plastic)
![size minzip ](https://img.shields.io/bundlephobia/minzip/eimspyr?style=plastic)
[![Continuous integration](https://github.com/Stassi/eimspyr/actions/workflows/ci.yml/badge.svg)](https://github.com/Stassi/eimspyr/actions/workflows/ci.yml)
[![CodeQL](https://github.com/Stassi/eimspyr/actions/workflows/codeql.yml/badge.svg)](https://github.com/Stassi/eimspyr/actions/workflows/codeql.yml)

**Eimspyr** is a [Node.js](https://nodejs.org/) [library](<https://en.wikipedia.org/wiki/Library_(computing)>) written in [TypeScript](https://www.typescriptlang.org/). It [queries information](https://developer.valvesoftware.com/wiki/Server_queries) from a running [Source Dedicated Server (SRCDS)](https://developer.valvesoftware.com/wiki/Source_Dedicated_Server) using [UDP/IP packets](https://en.wikipedia.org/wiki/User_Datagram_Protocol).

## Installation

```Shell
npm i eimspyr
```

## Usage

Example values for properties `address` & `port` must be replaced with the remote server to be queried.

### JavaScript

```javascript
import { infoQuery } from 'eimspyr'

const response = await infoQuery({
  address: '127.0.0.1',
  port: 12345,
})
```

### TypeScript

```typescript
import type { InfoQuery, RemoteDestination } from 'eimspyr'
import { infoQuery } from 'eimspyr'

const destination: RemoteDestination = {
  address: '127.0.0.1',
  port: 12345,
}

const response: InfoQuery = await infoQuery(destination)
```

## Types reference

Built-in type definitions are available for supported IDEs and editors, including for non-TypeScript users.

Importing types with TypeScript is optional and suggested for type safety and readability.

### Imports

```typescript
import type { InfoQuery, RemoteDestination } from 'eimspyr'
```

### Request

`RemoteDestination` is the input parameter for `infoQuery`.

```typescript
type RemoteDestination = {
  address: string
  port: number
  timeout?: number
}
```

#### Timeout

Queries time out at `3000` milliseconds (3 seconds) by default. This duration can be shortened or extended by providing a replacement `number` in milliseconds to the optional `timeout` property.

If the timeout occurs before the query completes, a `RangeError` is thrown.

Learn more about [`async` error handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#promise_rejection).

### Response

**Specification:** [_SRCDS server queries_](https://developer.valvesoftware.com/wiki/Server_queries)

The `InfoQuery` response object is JSON-serializable. Multiple fields are conditional to the value of `extraDataFlag`.

```typescript
type InfoQuery = {
  antiCheat: boolean
  appID?: string
  bots: number
  extraDataFlag: number
  folder: string
  game: string
  keywords?: string
  map: string
  operatingSystem: 'Linux' | 'macOS' | 'Windows'
  passwordRequired: boolean
  platformID?: string
  players: number
  playersMax: number
  port?: number
  protocolVersion: number
  response: {
    address: string
    challenge?: number
    family: string
    latency: number
    messages: [
      {
        message: Buffer
        size: number
      }
      // {...},
    ]
    packetSplit: boolean
    port: number
    type: 'A2S_INFO'
  }
  serverName: string
  serverType: 'dedicated' | 'local' | 'proxy'
  serverVersion: string
  spectatorName?: number
  spectatorPort?: number
}
```

## Compatibility

Simple query responses from `A2S_INFO` in a single non-split packet are compatible, including [anti-reflection attack challenges (est. Dec. 2020)](https://steamcommunity.com/discussions/forum/14/2974028351344359625/). Multi-packet responses are currently incompatible.

### Environment

[`node:buffer`](https://nodejs.org/api/dgram.html) and [`node:dgram`](https://nodejs.org/api/dgram.html) are Node.js dependencies that are incompatible with a browser environment, unless integrated with an API (see also: _Next.js API route handler_).

### Games tested

- [Valheim (2021)](https://en.wikipedia.org/wiki/Valheim)

Other games are likely compatible but have yet to be tested. For querying unsupported games in Node.js, try [node-GameDig (est. 2013)](https://github.com/gamedig/node-gamedig).

## Use cases

- [Functions as a service (FaaS)](https://en.wikipedia.org/wiki/Function_as_a_service)
- [REST API routes](https://en.wikipedia.org/wiki/Representational_state_transfer)
- [Web applications](https://en.wikipedia.org/wiki/Web_application)

### Next.js API route handler

- [Vercel | Next.js API routes](https://nextjs.org/docs/api-routes/introduction)

```javascript
import { infoQuery } from 'eimspyr'

export default async function handler(req, res) {
  res.status(200).json(
    await infoQuery({
      address: '127.0.0.1',
      port: 12345,
    })
  )
}
```
