/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {createPlaygroundResponse} from '../functionUtils/playgroundUtils';
import type {Handler} from '@netlify/functions';

export const handler: Handler = () =>
  Promise.resolve(createPlaygroundResponse('stackblitz-ts'));
