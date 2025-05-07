import { memo, type ComponentType, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { readonlyURL } from 'readonly-types';
import {
  safeParse,
  type UnionIssue,
  type ObjectIssue,
  type StringIssue,
  type BooleanIssue,
  type LiteralIssue,
} from 'valibot';

import { uuidV7 } from 'utils/uuidv7.ts';
import { storage } from 'utils/storage.ts';

import * as PublicService from 'services/public.ts';

import { visitResponseSchema, type VisitInput } from 'app/valibot.ts';

type Props = {
  pathname: string;
};

function F_Visit({ pathname }: Props): null {
  const { i18n } = useTranslation();

  const initRef = useRef<boolean>(false);

  useEffect((): void => {
    if (initRef.current !== false) {
      return;
    }

    initRef.current = true;

    const visitorId = storage.getItem('visitorId');
    const referrer = readonlyURL(document.referrer);

    if (visitorId === null) {
      if (typeof referrer !== 'undefined') {
        storage.setItem('referrerUrl', referrer.href);
      }

      const visitInput: VisitInput = {
        isFirstVisit: true,
        isNavigation: false,
        pathname,

        locale: i18n.language as 'en' | 'ru',
        referrer: referrer?.href ?? '',

        visitorId: uuidV7(),
        interactionId: uuidV7(),
      };

      PublicService.visit(visitInput)
        .then((response: unknown): void => {
          console.info(response);

          const safeVisitResponse = safeParse(visitResponseSchema, response);

          if (safeVisitResponse.success === false) {
            const errors = safeVisitResponse.issues.map(
              (
                issue:
                  | LiteralIssue
                  | UnionIssue<LiteralIssue>
                  | StringIssue
                  | BooleanIssue
                  | ObjectIssue
              ): string => {
                return `${
                  Array.isArray(issue.path)
                    ? issue.path
                        .map((p) => {
                          return `${p.key}`;
                        })
                        .join('.')
                    : ''
                } ${issue.type}: ${issue.message}`;
              }
            );

            console.error(errors);

            return;
          }

          if (safeVisitResponse.output.type === 'firstVisit') {
            storage.setItem('visitorId', safeVisitResponse.output.visitorId);

            return;
          }

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
        });

      return;
    }

    if (typeof visitorId === 'string' && visitorId !== '') {
      const visitInput: VisitInput = {
        isFirstVisit: false,
        isNavigation: false,
        pathname,

        locale: i18n.language as 'en' | 'ru',

        visitorId,
        interactionId: uuidV7(),
      };

      PublicService.visit(visitInput)
        .then((response: unknown): void => {
          const safeVisitResponse = safeParse(visitResponseSchema, response);

          if (safeVisitResponse.success === false) {
            const errors = safeVisitResponse.issues.map(
              (
                issue:
                  | LiteralIssue
                  | UnionIssue<LiteralIssue>
                  | StringIssue
                  | BooleanIssue
                  | ObjectIssue
              ): string => {
                return `${
                  Array.isArray(issue.path)
                    ? issue.path
                        .map((p) => {
                          return `${p.key}`;
                        })
                        .join('.')
                    : ''
                } ${issue.type}: ${issue.message}`;
              }
            );

            console.error(errors);

            return;
          }

          if (safeVisitResponse.output.type === 'comebackVisit') {
            storage.setItem('visitorId', safeVisitResponse.output.visitorId);

            return;
          }

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
        });

      return;
    }

    return;
  });

  return null;
}

export const Visit: ComponentType<Props> = memo<Props>(F_Visit);
