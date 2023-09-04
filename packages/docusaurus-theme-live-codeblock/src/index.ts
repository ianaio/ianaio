/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {readDefaultCodeTranslationMessages} from '@ianaio/theme-translations';
import type {LoadContext, Plugin} from '@ianaio/types';

export default function themeLiveCodeblock(context: LoadContext): Plugin {
  const {
    i18n: {currentLocale},
  } = context;

  return {
    name: 'ianaio-theme-live-codeblock',

    getThemePath() {
      return '../lib/theme';
    },
    getTypeScriptThemePath() {
      return '../src/theme';
    },

    getDefaultCodeTranslationMessages() {
      return readDefaultCodeTranslationMessages({
        locale: currentLocale,
        name: 'theme-live-codeblock',
      });
    },

    configureWebpack() {
      return {
        resolve: {
          alias: {
            buble: require.resolve('./custom-buble.js'),
          },
        },
      };
    },
  };
}

export {validateThemeConfig} from './validateThemeConfig';
