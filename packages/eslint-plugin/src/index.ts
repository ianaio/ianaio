/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import rules from './rules';

export = {
  rules,
  configs: {
    recommended: {
      plugins: ['@ianaio'],
      rules: {
        '@ianaio/string-literal-i18n-messages': 'error',
        '@ianaio/no-html-links': 'warn',
        '@ianaio/prefer-ianaio-heading': 'warn',
      },
    },
    all: {
      plugins: ['@ianaio'],
      rules: {
        '@ianaio/string-literal-i18n-messages': 'error',
        '@ianaio/no-untranslated-text': 'warn',
        '@ianaio/no-html-links': 'warn',
        '@ianaio/prefer-ianaio-heading': 'warn',
      },
    },
  },
};
