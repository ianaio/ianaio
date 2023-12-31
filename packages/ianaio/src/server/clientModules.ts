/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import path from 'path';
import type {LoadedPlugin} from '@ianaio/types';

/**
 * Runs the `getClientModules` lifecycle. The returned file paths are all
 * absolute.
 */
export function loadClientModules(plugins: LoadedPlugin[]): string[] {
  return plugins.flatMap(
    (plugin) =>
      plugin.getClientModules?.().map((p) => path.resolve(plugin.path, p)) ??
      [],
  );
}
