/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fs from 'fs-extra';
import path from 'path';
import logger from '@ianaio/logger';
import createSitemap from './createSitemap';
import type {PluginOptions, Options} from './options';
import type {LoadContext, Plugin} from '@ianaio/types';

export default function pluginSitemap(
  context: LoadContext,
  options: PluginOptions,
): Plugin<void> {
  return {
    name: 'ianaio-plugin-sitemap',

    async postBuild({siteConfig, routesPaths, outDir, head}) {
      if (siteConfig.noIndex) {
        return;
      }
      // Generate sitemap.
      const generatedSitemap = await createSitemap(
        siteConfig,
        routesPaths,
        head,
        options,
      );
      if (!generatedSitemap) {
        return;
      }

      // Write sitemap file.
      const sitemapPath = path.join(outDir, options.filename);
      try {
        await fs.outputFile(sitemapPath, generatedSitemap);
      } catch (err) {
        logger.error('Writing sitemap failed.');
        throw err;
      }
    },
  };
}

export {validateOptions} from './options';
export type {PluginOptions, Options};
