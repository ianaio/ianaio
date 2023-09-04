/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import path from 'path';
import {load, type LoadContextOptions} from '../index';
import type {Props} from '@ianaio/types';

// Helper methods to setup dummy/fake projects.
export async function loadSetup(
  name: string,
  options?: Partial<LoadContextOptions>,
): Promise<Props> {
  const fixtures = path.join(__dirname, '__fixtures__');
  return load({siteDir: path.join(fixtures, name), ...options});
}
