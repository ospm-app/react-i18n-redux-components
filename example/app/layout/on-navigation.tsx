import { memo, type ComponentType, useEffect } from 'react';
import { useNavigation } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import {
  safeParse,
  type UnionIssue,
  type ObjectIssue,
  type StringIssue,
  type LiteralIssue,
  type BooleanIssue,
} from 'valibot';

import { uuidV7 } from 'utils/uuidv7.ts';
import { storage } from 'utils/storage.ts';

import * as PublicService from 'services/public.ts';

import {
  type VisitInput,
  visitInputSchema,
  visitResponseSchema,
} from 'app/valibot.ts';

function F_OnNavigation(): null {
  const { i18n } = useTranslation();

  const navigation = useNavigation();

  // Navigation event
  useEffect((): void => {
    if (navigation.state !== 'loading') {
      return;
    }

    const visitorId = storage.getItem('visitorId');

    if (typeof visitorId !== 'string' || visitorId === '') {
      return;
    }

    const visitInput: VisitInput = {
      isFirstVisit: false,
      isNavigation: true,
      pathname: navigation.location.pathname,

      locale: i18n.language as 'en' | 'ru',

      visitorId,
      interactionId: uuidV7(),
    };

    const safeVisitInput = safeParse(visitInputSchema, visitInput);

    if (safeVisitInput.success === false) {
      const errors = safeVisitInput.issues.map(
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

    PublicService.visit(safeVisitInput.output satisfies VisitInput)
      .then((response: unknown): void => {
        const safeVisitResult = safeParse(visitResponseSchema, response);

        if (!safeVisitResult.success) {
          const errors = safeVisitResult.issues.map(
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

        if (safeVisitResult.output.type === 'navigation') {
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
  }, [navigation.location?.pathname, i18n.language, navigation.state]);

  return null;
}

export const OnNavigation: ComponentType = memo(F_OnNavigation);
