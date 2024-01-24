import split2 from 'split2';
import through2 from 'through2';
import fastJsonParse from 'fast-json-parse';

import type { ToLogEntry } from './types';

function parseJsonStream() {
  return split2(function (str) {
    const result = fastJsonParse(str);
    if (result.err) return;

    return result.value;
  });
}

function toLogEntryStream(toLogEntry: ToLogEntry) {
  return through2.obj(function transport(chunk, _enc, cb) {
    cb(null, toLogEntry(chunk));
  });
}

export { parseJsonStream, toLogEntryStream };
