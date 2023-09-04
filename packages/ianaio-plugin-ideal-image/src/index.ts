/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Joi} from '@ianaio/utils-validation';
import {readDefaultCodeTranslationMessages} from '@ianaio/theme-translations';
import type {
  LoadContext,
  Plugin,
  OptionValidationContext,
} from '@ianaio/types';
import type {PluginOptions} from '@ianaio/plugin-ideal-image';

export default function pluginIdealImage(
  context: LoadContext,
  options: PluginOptions,
): Plugin<void> {
  const {
    i18n: {currentLocale},
  } = context;

  return {
    name: 'ianaio-plugin-ideal-image',

    getThemePath() {
      return '../lib/theme';
    },

    getTypeScriptThemePath() {
      return '../src/theme';
    },

    getDefaultCodeTranslationMessages() {
      return readDefaultCodeTranslationMessages({
        locale: currentLocale,
        name: 'plugin-ideal-image',
      });
    },

    configureWebpack(_config, isServer) {
      const {disableInDev, ...loaderOptions} = options;
      if (disableInDev && process.env.NODE_ENV !== 'production') {
        return {};
      }

      return {
        mergeStrategy: {
          'module.rules': 'prepend',
        },
        module: {
          rules: [
            {
              test: /\.(?:png|jpe?g)$/i,
              use: [
                require.resolve('@ianaio/lqip-loader'),
                {
                  loader: require.resolve('@ianaio/responsive-loader'),
                  options: {
                    // Don't emit for server-side rendering
                    emitFile: !isServer,
                    // eslint-disable-next-line global-require
                    adapter: require('@ianaio/responsive-loader/sharp'),
                    name: 'assets/ideal-img/[name].[hash:hex:7].[width].[ext]',
                    ...loaderOptions,
                  },
                },
              ],
            },
          ],
        },
      };
    },
  };
}

export function validateOptions({
  validate,
  options,
}: OptionValidationContext<PluginOptions, PluginOptions>): PluginOptions {
  const pluginOptionsSchema = Joi.object<PluginOptions>({
    disableInDev: Joi.boolean().default(true),
  }).unknown();
  return validate(pluginOptionsSchema, options);
}
