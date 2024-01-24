import { pipeline } from 'stream';

import { parseJsonStream, toLogEntryStream } from './streams';
import type { ToLogEntry } from './types';

function createUpdateTransform(toLogEntry: ToLogEntry) {
  return pipeline(
    process.stdin,
    parseJsonStream(),
    toLogEntryStream(toLogEntry),
    process.stdout,
  );
}

export { createUpdateTransform };
