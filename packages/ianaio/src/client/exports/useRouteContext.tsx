/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {Context} from '../routeContext';
import type {PluginRouteContext} from '@ianaio/types';

export default function useRouteContext(): PluginRouteContext {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error('Unexpected: no Ianaio route context found');
  }
  return context;
}
