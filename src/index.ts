import build from 'pino-abstract-transport';
import get from 'lodash.get';

type JSON = Record<string, any>;
type Update = {
  path: string;
  contains: string[];
  merge: JSON;
};

export type Options = {
  updates: Update[];
};

function outputJSON(data: JSON) {
  console.log(JSON.stringify(data));
}

function updateLine(line: JSON, updates: Update[]) {
  let updatedLine = line;

  for (const { path, contains, merge } of updates) {
    const value = get(updatedLine, path) as string;

    if (value) {
      const matches = contains.map((s) => value.indexOf(s) !== -1);
      const matched = matches.filter(Boolean).length === contains.length;

      if (matched) {
        updatedLine = {
          ...updatedLine,
          ...(merge ?? {}),
        };
      }
    }
  }

  return updatedLine;
}

export default async function (options: Options) {
  const { updates } = options;

  return build(async function (source) {
    for await (let line of source) {
      outputJSON(updates ? updateLine(line, updates) : line);
    }
  });
}
