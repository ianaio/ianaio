/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import rule from '../no-untranslated-text';
import {getCommonValidTests, RuleTester} from './testUtils';

const errorsJSX = [{messageId: 'translateChildren'}] as const;

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run('no-untranslated-text', rule, {
  valid: [
    ...getCommonValidTests(),
    {
      code: '<Component>·</Component>',
      options: [{ignoredStrings: ['·', '—', '×']}],
    },
    {
      code: '<Component>· </Component>',
      options: [{ignoredStrings: ['·', '—', '×']}],
    },
    {
      code: '<Component> · </Component>',
      options: [{ignoredStrings: ['·', '—', '×']}],
    },
    {
      code: '<Component>· ·</Component>',
      options: [{ignoredStrings: ['·', '—', '×']}],
    },
    {
      code: '<Component>· — ×</Component>',
      options: [{ignoredStrings: ['·', '—', '×']}],
    },
    {
      code: '<Component>{"·"}</Component>',
      options: [{ignoredStrings: ['·']}],
    },
    {
      code: "<Component>{'·'}</Component>",
      options: [{ignoredStrings: ['·']}],
    },
    {
      code: '<Component>{`·`}</Component>',
      options: [{ignoredStrings: ['·', '—', '×']}],
    },
    {
      code: '<Component>Ianaio</Component>',
      options: [{ignoredStrings: ['Ianaio']}],
    },
    {
      code: '<Component>&#8203;</Component>',
      options: [{ignoredStrings: ['​']}],
    },
    {
      code: `<>
              {' · '}
            </>`,
      options: [{ignoredStrings: ['·']}],
    },
  ],

  invalid: [
    {
      code: '<Component>text</Component>',
      errors: errorsJSX,
    },
    {
      code: '<Component> text </Component>',
      errors: errorsJSX,
    },
    {
      code: '<Component>"text"</Component>',
      errors: errorsJSX,
    },
    {
      code: "<Component>'text'</Component>",
      errors: errorsJSX,
    },
    {
      code: '<Component>`text`</Component>',
      errors: errorsJSX,
    },
    {
      code: '<Component>{"text"}</Component>',
      errors: errorsJSX,
    },
    {
      code: "<Component>{'text'}</Component>",
      errors: errorsJSX,
    },
    {
      code: '<Component>{`text`}</Component>',
      errors: errorsJSX,
    },
    {
      code: '<>text</>',
      errors: errorsJSX,
    },
    {
      code: '<Component>· — ×</Component>',
      errors: errorsJSX,
      options: [{ignoredStrings: ['·', '—']}],
    },
    {
      code: '<Component>··</Component>',
      errors: errorsJSX,
      options: [{ignoredStrings: ['·', '—', '×']}],
    },
    {
      code: '<Component> ·· </Component>',
      errors: errorsJSX,
      options: [{ignoredStrings: ['·', '—', '×']}],
    },
    {
      code: '<Component>"·"</Component>',
      errors: errorsJSX,
      options: [{ignoredStrings: ['·', '—', '×']}],
    },
    {
      code: "<Component>'·'</Component>",
      errors: errorsJSX,
      options: [{ignoredStrings: ['·', '—', '×']}],
    },
    {
      code: '<Component>`·`</Component>',
      errors: errorsJSX,
      options: [{ignoredStrings: ['·', '—', '×']}],
    },
    {
      code: '<Component>Ianaio</Component>',
      errors: errorsJSX,
      options: [{ignoredStrings: ['Docu', 'saurus']}],
    },
  ],
});
