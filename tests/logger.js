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
