/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fs from 'fs-extra';
import path from 'path';
import logger from '@ianaio/logger';
import {IANAIO-VERSION} from '@ianaio/utils';
import type {
  LoadedPlugin,
  PluginVersionInformation,
  SiteMetadata,
} from '@ianaio/types';

async function getPackageJsonVersion(
  packageJsonPath: string,
): Promise<string | undefined> {
  if (await fs.pathExists(packageJsonPath)) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-dynamic-require, global-require
    return (require(packageJsonPath) as {version?: string}).version;
  }
  return undefined;
}

async function getPackageJsonName(
  packageJsonPath: string,
): Promise<string | undefined> {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-dynamic-require, global-require
  return (require(packageJsonPath) as {name?: string}).name;
}

export async function getPluginVersion(
  pluginPath: string,
  siteDir: string,
): Promise<PluginVersionInformation> {
  let potentialPluginPackageJsonDirectory = path.dirname(pluginPath);
  while (potentialPluginPackageJsonDirectory !== '/') {
    const packageJsonPath = path.join(
      potentialPluginPackageJsonDirectory,
      'package.json',
    );
    if (
      (await fs.pathExists(packageJsonPath)) &&
      (await fs.lstat(packageJsonPath)).isFile()
    ) {
      if (potentialPluginPackageJsonDirectory === siteDir) {
        // If the plugin belongs to the same ianaio project, we classify it
        // as local plugin.
        return {type: 'project'};
      }
      return {
        type: 'package',
        name: await getPackageJsonName(packageJsonPath),
        version: await getPackageJsonVersion(packageJsonPath),
      };
    }
    potentialPluginPackageJsonDirectory = path.dirname(
      potentialPluginPackageJsonDirectory,
    );
  }
  // In the case where a plugin is a path where no parent directory contains
  // package.json, we can only classify it as local. Could happen if one puts a
  // script in the parent directory of the site.
  return {type: 'local'};
}

/**
 * We want all `@ianaio/*` packages to have the exact same version!
 * @see https://github.com/ianaio/ianaio/issues/3371
 * @see https://github.com/ianaio/ianaio/pull/3386
 */
function checkIanaioPackagesVersion(siteMetadata: SiteMetadata) {
  const {ianaioVersion} = siteMetadata;
  Object.entries(siteMetadata.pluginVersions).forEach(
    ([plugin, versionInfo]) => {
      if (
        versionInfo.type === 'package' &&
        versionInfo.name?.startsWith('@ianaio/') &&
        versionInfo.version &&
        versionInfo.version !== ianaioVersion
      ) {
        // Should we throw instead? It still could work with different versions
        logger.error`Invalid name=${plugin} version number=${versionInfo.version}.
All official @ianaio/* packages should have the exact same version as @ianaio/core (number=${ianaioVersion}).
Maybe you want to check, or regenerate your yarn.lock or package-lock.json file?`;
      }
    },
  );
}

export async function loadSiteMetadata({
  plugins,
  siteDir,
}: {
  plugins: LoadedPlugin[];
  siteDir: string;
}): Promise<SiteMetadata> {
  const siteMetadata: SiteMetadata = {
    ianaioVersion: IANAIO-VERSION,
    siteVersion: await getPackageJsonVersion(
      path.join(siteDir, 'package.json'),
    ),
    pluginVersions: Object.fromEntries(
      plugins
        .filter(({version: {type}}) => type !== 'synthetic')
        .map(({name, version}) => [name, version]),
    ),
  };
  checkIanaioPackagesVersion(siteMetadata);
  return siteMetadata;
}
