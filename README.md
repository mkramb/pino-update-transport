# pino-update-transport

## Descriptions

Custom pino transport to allow JSON line updates / transformation.

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
    target: __dirname + '/../dist/index',
    options: {
      updates,
    },
  },
});

logger.error({ error: { type: 'error as disconnect' } }, 'error happened');
```

## Development

```
pnpm build
pnpm test
```
