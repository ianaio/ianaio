/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import path from 'path';
import merge from 'webpack-merge';
import {
  NODE_MAJOR_VERSION,
  NODE_MINOR_VERSION,
  IANAIO-VERSION,
} from '@ianaio/utils';
// Forked for Ianaio: https://github.com/slorber/static-site-generator-webpack-plugin
import StaticSiteGeneratorPlugin, {
  type Locals,
} from '@slorber/static-site-generator-webpack-plugin';
import WebpackBar from 'webpackbar';
import {createBaseConfig} from './base';
import WaitPlugin from './plugins/WaitPlugin';
import ssrDefaultTemplate from './templates/ssr.html.template';
import type {Props} from '@ianaio/types';
import type {Configuration} from 'webpack';

export default async function createServerConfig({
  props,
  onLinksCollected,
  onHeadTagsCollected,
}: Pick<Locals, 'onLinksCollected' | 'onHeadTagsCollected'> & {
  props: Props;
}): Promise<Configuration> {
  const {
    baseUrl,
    routesPaths,
    generatedFilesDir,
    headTags,
    preBodyTags,
    postBodyTags,
    siteConfig: {noIndex, trailingSlash, ssrTemplate},
  } = props;
  const config = await createBaseConfig(props, true);

  const routesLocation: {[filePath: string]: string} = {};
  // Array of paths to be rendered. Relative to output directory
  const ssgPaths = routesPaths.map((str) => {
    const ssgPath =
      baseUrl === '/' ? str : str.replace(new RegExp(`^${baseUrl}`), '/');
    routesLocation[ssgPath] = str;
    return ssgPath;
  });
  const serverConfig = merge(config, {
    target: `node${NODE_MAJOR_VERSION}.${NODE_MINOR_VERSION}`,
    entry: {
      main: path.resolve(__dirname, '../client/serverEntry.js'),
    },
    output: {
      filename: 'server.bundle.js',
      libraryTarget: 'commonjs2',
      // Workaround for Webpack 4 Bug (https://github.com/webpack/webpack/issues/6522)
      globalObject: 'this',
    },
    plugins: [
      // Wait until manifest from client bundle is generated
      new WaitPlugin({
        filepath: path.join(generatedFilesDir, 'client-manifest.json'),
      }),

      // Static site generator webpack plugin.
      new StaticSiteGeneratorPlugin({
        entry: 'main',
        locals: {
          baseUrl,
          generatedFilesDir,
          routesLocation,
          headTags,
          preBodyTags,
          postBodyTags,
          onLinksCollected,
          onHeadTagsCollected,
          ssrTemplate: ssrTemplate ?? ssrDefaultTemplate,
          noIndex,
          IANAIO-VERSION,
        },
        paths: ssgPaths,
        preferFoldersOutput: trailingSlash,

        // When using "new URL('file.js', import.meta.url)", Webpack will emit
        // __filename, and this plugin will throw. not sure the __filename value
        // has any importance for this plugin, just using an empty string to
        // avoid the error. See https://github.com/ianaio/ianaio/issues/4922
        globals: {__filename: ''},

        // Secret way to set SSR plugin concurrency option
        // Waiting for feedback before documenting this officially?
        concurrency: process.env.IANAIO_SSR_CONCURRENCY
          ? parseInt(process.env.IANAIO_SSR_CONCURRENCY, 10)
          : undefined,
      }),

      // Show compilation progress bar.
      new WebpackBar({
        name: 'Server',
        color: 'yellow',
      }),
    ],
  });
  return serverConfig;
}
