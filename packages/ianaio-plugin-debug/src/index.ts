/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import path from 'path';
import {docuHash, normalizeUrl, posixPath} from '@ianaio/utils';
import type {LoadContext, Plugin} from '@ianaio/types';

export default function pluginDebug({
  siteConfig: {baseUrl},
  generatedFilesDir,
}: LoadContext): Plugin<undefined> {
  const pluginDataDirRoot = path.join(
    generatedFilesDir,
    'ianaio-plugin-debug',
  );
  const aliasedSource = (source: string) =>
    `~debug/${posixPath(path.relative(pluginDataDirRoot, source))}`;

  return {
    name: 'ianaio-plugin-debug',

    getThemePath() {
      return '../lib/theme';
    },
    getTypeScriptThemePath() {
      return '../src/theme';
    },

    async contentLoaded({actions: {createData, addRoute}, allContent}) {
      const allContentPath = await createData(
        // Note that this created data path must be in sync with
        // metadataPath provided to mdx-loader.
        `${docuHash('ianaio-debug-allContent')}.json`,
        JSON.stringify(allContent, null, 2),
      );

      // Home is config (duplicate for now)
      addRoute({
        path: normalizeUrl([baseUrl, '__ianaio/debug']),
        component: '@theme/DebugConfig',
        exact: true,
      });

      addRoute({
        path: normalizeUrl([baseUrl, '__ianaio/debug/config']),
        component: '@theme/DebugConfig',
        exact: true,
      });

      addRoute({
        path: normalizeUrl([baseUrl, '__ianaio/debug/metadata']),
        component: '@theme/DebugSiteMetadata',
        exact: true,
      });

      addRoute({
        path: normalizeUrl([baseUrl, '__ianaio/debug/registry']),
        component: '@theme/DebugRegistry',
        exact: true,
      });

      addRoute({
        path: normalizeUrl([baseUrl, '__ianaio/debug/routes']),
        component: '@theme/DebugRoutes',
        exact: true,
      });

      addRoute({
        path: normalizeUrl([baseUrl, '__ianaio/debug/content']),
        component: '@theme/DebugContent',
        exact: true,
        modules: {
          allContent: aliasedSource(allContentPath),
        },
      });

      addRoute({
        path: normalizeUrl([baseUrl, '__ianaio/debug/globalData']),
        component: '@theme/DebugGlobalData',
        exact: true,
      });
    },

    configureWebpack() {
      return {
        resolve: {
          alias: {
            '~debug': pluginDataDirRoot,
          },
        },
      };
    },
  };
}
