# pino-update-transport

## Descriptions

Pino transport to allow JSON lines updates before final output.

## Example

On first update:

- will search for error.type field
- check if value contains error and disconnect
- and will set level attribute to 40

On second update:

- will search for msg field
- check if value contains "error"
- and will set isError attribute as true

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

With output as:

```
{"level":40,"time":1706145844495,"pid":9319,"hostname":"Mitjas-MBP","error":{"type":"error as disconnect"},"msg":"error happened","isError":true}
```

## Development

```
pnpm build
pnpm test
```
