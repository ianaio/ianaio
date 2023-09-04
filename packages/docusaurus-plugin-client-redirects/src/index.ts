/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {removePrefix, addLeadingSlash} from '@ianaio/utils';
import collectRedirects from './collectRedirects';
import writeRedirectFiles, {
  toRedirectFiles,
  type RedirectFile,
} from './writeRedirectFiles';
import type {LoadContext, Plugin} from '@ianaio/types';
import type {PluginContext, RedirectItem} from './types';
import type {PluginOptions, Options} from './options';

export default function pluginClientRedirectsPages(
  context: LoadContext,
  options: PluginOptions,
): Plugin<void> {
  const {trailingSlash} = context.siteConfig;

  return {
    name: 'ianaio-plugin-client-redirects',
    async postBuild(props) {
      const pluginContext: PluginContext = {
        relativeRoutesPaths: props.routesPaths.map(
          (path) => `${addLeadingSlash(removePrefix(path, props.baseUrl))}`,
        ),
        baseUrl: props.baseUrl,
        outDir: props.outDir,
        options,
        siteConfig: props.siteConfig,
      };

      const redirects: RedirectItem[] = collectRedirects(
        pluginContext,
        trailingSlash,
      );

      const redirectFiles: RedirectFile[] = toRedirectFiles(
        redirects,
        pluginContext,
        trailingSlash,
      );

      // Write files only at the end: make code more easy to test without IO
      await writeRedirectFiles(redirectFiles);
    },
  };
}

export {validateOptions} from './options';
export type {PluginOptions, Options};
