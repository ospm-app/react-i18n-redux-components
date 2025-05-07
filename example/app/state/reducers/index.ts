import { enableMapSet } from 'immer';

import { reducer as app } from 'state/reducers/app.ts';
import { reducer as profile } from 'state/reducers/profile.ts';
import { reducer as forms } from 'state/reducers/forms.ts';

import { reducer as packages } from 'state/reducers/packages.ts';
import { reducer as projects } from 'state/reducers/projects.ts';

import { reducer as organizationPublic } from 'state/reducers/organization-public.ts';
import { reducer as organizationPrivate } from 'state/reducers/organization-private.ts';
import { reducer as organizationsPublic } from 'state/reducers/organizations-public.ts';
import { reducer as organizationsPrivate } from 'state/reducers/organizations-private.ts';

enableMapSet();

export const reducer = {
  app,
  forms,
  profile,

  packages,
  projects,

  organizationPublic,
  organizationPrivate,
  organizationsPublic,
  organizationsPrivate,
};
