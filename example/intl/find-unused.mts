import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

function removeElements(
  items: Set<string>,
  obj: Record<string, unknown>
): Set<unknown> {
  for (const key of Object.keys(obj)) {
    items.delete(key);
  }

  return items;
}

async function getIntlElements(): Promise<Set<string>> {
  const items = Object.keys(
    await import('../../app/const/intl/en.json', {
      with: { type: 'json' },
    }).then((module) => module.default)
  ).reduce((acc, value) => {
    return acc.add(value);
  }, new Set<string>());

  removeElements(
    items,
    await import('./network-messages-en.json', {
      with: { type: 'json' },
    }).then((module) => module.default)
  );
  removeElements(
    items,
    await import('./calendar-en.json', {
      with: { type: 'json' },
    }).then((module) => module.default)
  );
  removeElements(
    items,
    await import('./countries-en.json', {
      with: { type: 'json' },
    }).then((module) => module.default)
  );

  return items;
}

const elements = await getIntlElements();

const found = new Set<string>();

function getDirectoryFiles(dirPath: fs.PathLike): Promise<Array<fs.Dirent>> {
  return new Promise((resolve, reject) => {
    fs.readdir(
      dirPath,
      { withFileTypes: true },
      (err: NodeJS.ErrnoException | null, files: Array<fs.Dirent>): void => {
        if (err === null) {
          resolve(files);
        } else {
          reject(err);
        }
      }
    );
  });
}

const quotes = Uint8Array.from([
  "'".charCodeAt(0),
  '"'.charCodeAt(0),
  '`'.charCodeAt(0),
]);

function indexOneOf(buffer: Buffer, list: Uint8Array, startOffset = 0): number {
  for (let i = startOffset; i < buffer.length; ++i) {
    const item = buffer[i];

    if (typeof item === 'number' && list.includes(item)) {
      return i;
    }
  }

  return -1;
}

const slash = '\\'.charCodeAt(0);

function isEscapedSymbol(buffer: Buffer, pos: number): boolean {
  let cur = pos;

  do {
    --cur;
  } while (cur >= 0 && buffer[cur] === slash);

  return (pos - cur + 1) % 2 === 1;
}

function searchElements(buffer: Buffer): void {
  let pos = indexOneOf(buffer, quotes);

  while (pos !== -1) {
    const quote = buffer[pos];

    if (typeof quote !== 'number') {
      break;
    }

    let next = buffer.indexOf(quote, pos + 1);

    while (next !== -1 && isEscapedSymbol(buffer, next)) {
      next = buffer.indexOf(quote, next + 1);
    }

    if (next === -1) {
      break;
    }

    const key = buffer.toString('utf8', pos + 1, next);

    if (elements.has(key)) {
      found.add(key);
    }

    pos = indexOneOf(buffer, quotes, next + 1);
  }
}

function analyzeFile(filePath: fs.PathLike): Promise<void> {
  return new Promise((resolve, reject): void => {
    fs.readFile(
      filePath,
      (err: NodeJS.ErrnoException | null, data: Buffer): void => {
        if (err) {
          reject(err);
        }

        resolve(searchElements(data));
      }
    );
  });
}

const extensions = new Set<string>(['.tsx', '.ts', '.jsx', '.js']);

function filesProcessing(
  dirPath: fs.PathLike,
  files: Array<fs.Dirent>
): Promise<void> {
  const promises: Array<Promise<void>> = [];

  for (const file of files) {
    const filePath = path.resolve(dirPath.toString(), file.name);

    if (file.isDirectory()) {
      promises.push(analyzeDirectory(filePath));
    } else if (file.isFile()) {
      const ext = path.extname(file.name);

      if (extensions.has(ext)) {
        promises.push(analyzeFile(filePath));
      }
    }
  }

  return Promise.all(promises).then(() => {
    return;
  });
}

function analyzeDirectory(dirPath: string): Promise<void> {
  return getDirectoryFiles(dirPath).then(
    (files: Array<fs.Dirent>): Promise<void> => {
      return filesProcessing(dirPath, files);
    }
  );
}

function main(targetPath: string): Promise<void> {
  const resolvedPath = path.resolve(targetPath);

  console.info('Search in the directory:', resolvedPath);

  return analyzeDirectory(resolvedPath)
    .then(() => {
      const unused: Array<string> = [];

      for (const value of elements) {
        if (!found.has(value)) {
          unused.push(value);
        }
      }

      console.info(
        unused.length > 0 ? unused.join('\n') : '❤ no unused elements found!'
      );

      return;
    })
    .catch((error: unknown): void => {
      if (error instanceof Error) {
        console.error(error.message);
      } else if (typeof error === 'string') {
        console.error(error);
      } else {
        console.error(JSON.stringify(error));
      }

      process.exitCode = 1;
    });
}

main('./');
