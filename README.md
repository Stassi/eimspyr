# SourceMeter

![npm](https://img.shields.io/npm/v/sourcemeter?style=plastic)
![GitHub](https://img.shields.io/github/license/Stassi/sourcemeter?style=plastic)
![npm type definitions](https://img.shields.io/npm/types/sourcemeter?style=plastic)
![node-current](https://img.shields.io/node/v/sourcemeter?style=plastic)
![size repository](https://img.shields.io/github/languages/code-size/Stassi/sourcemeter?style=plastic)
![size minified](https://img.shields.io/bundlephobia/min/sourcemeter?style=plastic)
![size minzip ](https://img.shields.io/bundlephobia/minzip/sourcemeter?style=plastic)
[![Continuous integration](https://github.com/Stassi/sourcemeter/actions/workflows/ci.yml/badge.svg)](https://github.com/Stassi/sourcemeter/actions/workflows/ci.yml)
[![CodeQL](https://github.com/Stassi/sourcemeter/actions/workflows/codeql.yml/badge.svg)](https://github.com/Stassi/sourcemeter/actions/workflows/codeql.yml)

**SourceMeter** is a [Node.js](https://nodejs.org/) [library](<https://en.wikipedia.org/wiki/Library_(computing)>) written in [TypeScript](https://www.typescriptlang.org/). It [queries information](https://developer.valvesoftware.com/wiki/Server_queries) from a running [Source Dedicated Server (SRCDS)](https://developer.valvesoftware.com/wiki/Source_Dedicated_Server) using [UDP/IP packets](https://en.wikipedia.org/wiki/User_Datagram_Protocol).

## Installation

```Shell
npm i sourcemeter
```

## Usage

### Request

Built-in type definitions are available for supported IDEs and editors, including for non-TypeScript users.

Example values for properties `address` & `port` must be replaced with the remote server to be queried.

#### JavaScript

```javascript
import { infoQuery } from 'sourcemeter'

const response = await infoQuery({
  address: '127.0.0.1',
  port: 12345,
})
```

#### TypeScript

```typescript
import type { InfoQuery, RemoteDestination } from 'sourcemeter'
import { infoQuery } from 'sourcemeter'

const destination: RemoteDestination = {
  address: '127.0.0.1',
  port: 12345,
}

const response: InfoQuery = await infoQuery(destination)
```

#### Input type

```typescript
import type { RemoteDestination } from 'sourcemeter'
```

```typescript
type RemoteDestination = {
  address: string
  port: number
}
```

### Response

**Specification:** [_SRCDS server queries_](https://developer.valvesoftware.com/wiki/Server_queries)

The `InfoQuery` response object is JSON-serializable. Multiple fields are conditional to the value of `extraDataFlag`.

```typescript
import type { InfoQuery } from 'sourcemeter'
```

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
import { infoQuery } from 'sourcemeter'

export default async function handler(req, res) {
  res.status(200).json(
    await infoQuery({
      address: '127.0.0.1',
      port: 12345,
    })
  )
}
```
