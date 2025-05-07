import {
  memo,
  useState,
  useRef,
  type JSX,
  useCallback,
  type ComponentType,
} from 'react';
import { safeParse, type ObjectIssue, type StringIssue } from 'valibot';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@remix-run/react';

import { routes } from 'app/routes.ts';

import { uuidV7 } from 'utils/uuidv7.ts';
import { storage } from 'utils/storage.ts';

import * as AuthService from 'services/auth.ts';

import {
  serverErrorSchema,
  serverSuccessSchema,
  type ResendEmailVerifyInput,
  resendEmailVerifyInputSchema,
} from 'app/valibot.ts';

import { navigateIntl } from 'library/intl/navigate.ts';

import type { IntlMessageId } from 'const/intl/index.ts';

type Props = {
  currentLocale: string;
  resendVerificationEmailButtonLabel: IntlMessageId;
};

function F_NotVerified({
  currentLocale,
  resendVerificationEmailButtonLabel,
}: Props): JSX.Element {
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const { i18n, t } = useTranslation();

  const navigate = useNavigate();

  const prevInputRef = useRef<
    Omit<ResendEmailVerifyInput, 'visitorId' | 'interactionId'> | undefined
  >(undefined);

  const interactionIdRef = useRef<string>(uuidV7());

  const onClick = useCallback<() => Promise<void>>(async () => {
    setIsFetching(true);

    const visitorId = storage.getItem('visitorId') ?? '';

    const safeInput = safeParse(resendEmailVerifyInputSchema, {
      currentLocale,

      visitorId,
      interactionId: interactionIdRef.current,
    } satisfies ResendEmailVerifyInput);

    if (safeInput.success) {
      if (typeof prevInputRef.current === 'undefined') {
        prevInputRef.current = {
          currentLocale: safeInput.output.currentLocale,
        };
      } else {
        let newInteractionId = false;

        if (
          prevInputRef.current.currentLocale !== safeInput.output.currentLocale
        ) {
          prevInputRef.current.currentLocale = safeInput.output.currentLocale;
          newInteractionId = true;
        }

        if (newInteractionId) {
          interactionIdRef.current = uuidV7();
        }
      }

      const response = await AuthService.resendEmailVerify(
        safeInput.output.currentLocale,
        safeInput.output.visitorId,
        interactionIdRef.current
      );

      const safeServerErrorResponse = safeParse(serverErrorSchema, response);

      const safeServerSuccessResponse = safeParse(
        serverSuccessSchema,
        response
      );

      if (safeServerErrorResponse.success) {
        // TODO show error message

        return;
      }

      if (safeServerSuccessResponse.success) {
        return navigateIntl(routes.dashboard, i18n.language, navigate);
      }

      setIsFetching(false);

      return;
    }

    const errors = safeInput.issues.map(
      (issue: StringIssue | ObjectIssue): string => {
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

    // TODO show error message
  }, [currentLocale, i18n.language, navigate]);

  // TODO: i18n
  return (
    <div>
      <button type='button' onClick={onClick} disabled={isFetching}>
        {t(resendVerificationEmailButtonLabel)}
      </button>
    </div>
  );
}

export const NotVerified: ComponentType<Props> = memo<Props>(F_NotVerified);
