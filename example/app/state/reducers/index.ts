import { enableMapSet } from 'immer';

import { reducer as app } from 'state/reducers/app.ts';
import { reducer as forms } from 'state/reducers/forms.ts';

enableMapSet();

export const reducer = {
  app,
  forms,
};
