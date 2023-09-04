/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {createRequire} from 'module';
import importFresh from 'import-fresh';
import {resolveModuleName} from './moduleShorthand';
import type {
  LoadContext,
  PluginConfig,
  PresetModule,
  IanaioConfig,
} from '@ianaio/types';

type ImportedPresetModule = PresetModule & {default?: PresetModule};

/**
 * Calls preset functions, aggregates each of their return values, and returns
 * the plugin and theme configs.
 */
export async function loadPresets(
  context: LoadContext,
): Promise<Pick<IanaioConfig, 'plugins' | 'themes'>> {
  // We need to resolve plugins from the perspective of the site config, as if
  // we are using `require.resolve` on those module names.
  const presetRequire = createRequire(context.siteConfigPath);

  const {presets} = context.siteConfig;
  const plugins: PluginConfig[] = [];
  const themes: PluginConfig[] = [];

  presets.forEach((presetItem) => {
    let presetModuleImport: string;
    let presetOptions = {};
    if (!presetItem) {
      return;
    }
    if (typeof presetItem === 'string') {
      presetModuleImport = presetItem;
    } else {
      [presetModuleImport, presetOptions] = presetItem;
    }
    const presetName = resolveModuleName(
      presetModuleImport,
      presetRequire,
      'preset',
    );

    const presetModule = importFresh<ImportedPresetModule>(
      presetRequire.resolve(presetName),
    );
    const preset = (presetModule.default ?? presetModule)(
      context,
      presetOptions,
    );

    if (preset.plugins) {
      plugins.push(...preset.plugins);
    }
    if (preset.themes) {
      themes.push(...preset.themes);
    }
  });

  return {plugins, themes};
}
