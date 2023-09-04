/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {Plugin} from '@ianaio/types';

export default function themeMermaid(): Plugin<void> {
  return {
    name: 'ianaio-theme-mermaid',

    getThemePath() {
      return '../lib/theme';
    },
    getTypeScriptThemePath() {
      return '../src/theme';
    },
  };
}

export {validateThemeConfig} from './validateThemeConfig';
