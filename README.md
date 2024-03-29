# pino-update-transport

## Description

Pino transport to allow JSON lines updates before final output.

## Example

First update:

- will search for error.type field
- check if value contains error and disconnect
- if matched, will set level attribute to 40

Second update:

- will search for msg field
- check if value contains "error"
- if matched, will set isError attribute as true

```
const pino = require('pino');

const updates = [
  {
    path: 'error.type',
    contains: ['error', 'disconnect'],
    merge: { level: 40 },
  },
  {
    path: 'msg',
    contains: ['error'],
    merge: { isError: true },
  },
];

const logger = pino({
  level: 'info',
  transport: {
    target: 'pino-update-transport',
    options: {
      updates,
    },
  },
});

logger.error({ error: { type: 'error as disconnect' } }, 'error happened');
```

Generate output as:

```
{"level":40,"time":1706145844495,"pid":9319,"hostname":"Mitjas-MBP","error":{"type":"error as disconnect"},"msg":"error happened","isError":true}
```

## Development

```
pnpm build
pnpm test
```
