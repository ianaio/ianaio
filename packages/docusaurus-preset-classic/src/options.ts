/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {Options as DocsPluginOptions} from '@ianaio/plugin-content-docs';
import type {Options as BlogPluginOptions} from '@ianaio/plugin-content-blog';
import type {Options as PagesPluginOptions} from '@ianaio/plugin-content-pages';
import type {Options as SitemapPluginOptions} from '@ianaio/plugin-sitemap';
import type {Options as GAPluginOptions} from '@ianaio/plugin-google-analytics';
import type {Options as GtagPluginOptions} from '@ianaio/plugin-google-gtag';
import type {Options as GTMPluginOptions} from '@ianaio/plugin-google-tag-manager';
import type {Options as ThemeOptions} from '@ianaio/theme-classic';
import type {ThemeConfig as BaseThemeConfig} from '@ianaio/types';
import type {UserThemeConfig as ClassicThemeConfig} from '@ianaio/theme-common';
import type {UserThemeConfig as AlgoliaThemeConfig} from '@ianaio/theme-search-algolia';

export type Options = {
  /**
   * Options for `@ianaio/plugin-debug`. Use `false` to disable, or `true`
   * to enable even in production.
   */
  debug?: boolean;
  /** Options for `@ianaio/plugin-content-docs`. Use `false` to disable. */
  docs?: false | DocsPluginOptions;
  /** Options for `@ianaio/plugin-content-blog`. Use `false` to disable. */
  blog?: false | BlogPluginOptions;
  /** Options for `@ianaio/plugin-content-pages`. Use `false` to disable. */
  pages?: false | PagesPluginOptions;
  /** Options for `@ianaio/plugin-sitemap`. Use `false` to disable. */
  sitemap?: false | SitemapPluginOptions;
  /** Options for `@ianaio/theme-classic`. */
  theme?: ThemeOptions;
  /**
   * Options for `@ianaio/plugin-google-analytics`. Only enabled when the
   * key is present.
   */
  googleAnalytics?: GAPluginOptions;
  /**
   * Options for `@ianaio/plugin-google-gtag`. Only enabled when the key
   * is present.
   */
  gtag?: GtagPluginOptions;
  googleTagManager?: GTMPluginOptions;
};

export type ThemeConfig = BaseThemeConfig &
  ClassicThemeConfig &
  AlgoliaThemeConfig;
