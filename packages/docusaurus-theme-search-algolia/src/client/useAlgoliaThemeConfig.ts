/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */
import useIanaioContext from '@ianaio/useIanaioContext';
import type {ThemeConfig} from '@ianaio/theme-search-algolia';

export function useAlgoliaThemeConfig(): ThemeConfig {
  const {
    siteConfig: {themeConfig},
  } = useIanaioContext();
  return themeConfig as ThemeConfig;
}
