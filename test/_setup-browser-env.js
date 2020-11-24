/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
// https://github.com/avajs/ava/blob/master/docs/recipes/browser-testing.md
const browserEnv = require('browser-env');
browserEnv(['window', 'document', 'navigator']);