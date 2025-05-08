import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { isFileEqualBuffer } from 'is-file-equal-buffer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
async function getJson(locale: string, fileName: string): Promise<any> {
  try {
    return await import(`./${fileName}-${locale}.json`, {
      assert: { type: 'json' },
    }).then((module) => {
      return module.default;
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else if (typeof error === 'string') {
      console.error(error);
    } else {
      console.error(JSON.stringify(error));
    }

    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code !== 'MODULE_NOT_FOUND'
    ) {
      process.exitCode = 1;
    }

    return {};
  }
}

const languages = ['en', 'ru', 'te'];

// biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
async function main(): Promise<void | Array<unknown>> {
  const promises: Array<Promise<unknown>> = [];

  for (const locale of languages) {
    promises.push(
      Promise.all([
        getJson(locale, 'calendar'),
        getJson(locale, 'countries'),
        getJson(locale, 'datepicker'),

        getJson(locale, 'layout'),
        getJson(locale, 'header'),
        getJson(locale, 'footer'),

        getJson(locale, 'page-notfound'),

        getJson(locale, 'page-ui-kit'),

        getJson(locale, 'timezone'),
      ]).then((list) => {
        const filePath = path.join(
          __dirname,
          `/../app/const/intl/${locale}.json`
        );

        const buffer = Buffer.from(
          JSON.stringify(Object.assign(...list), null, 2),
          'utf8'
        );

        return isFileEqualBuffer(filePath, buffer).then((isEqual) => {
          return isEqual
            ? undefined
            : new Promise((resolve, reject) => {
                fs.writeFile(
                  filePath,
                  buffer,
                  { flag: 'w' },
                  (err: NodeJS.ErrnoException | null) => {
                    if (err === null) {
                      resolve(undefined);
                    } else {
                      reject(err);
                    }
                  }
                );
              });
        });
      })
    );
  }

  return await Promise.all(promises).catch((error: unknown): void => {
    if (error instanceof Error) {
      console.error(error.message);
    } else if (typeof error === 'string') {
      console.error(error);
    } else {
      console.error(JSON.stringify(error));
    }
  });
}

main().catch((error: unknown): void => {
  if (error instanceof Error) {
    console.error(error.message);
  } else if (typeof error === 'string') {
    console.error(error);
  } else {
    console.error(JSON.stringify(error));
  }
});
