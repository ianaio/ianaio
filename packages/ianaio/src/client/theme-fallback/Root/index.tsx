/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import type {Props} from '@theme/Root';

// Wrapper at the very top of the app, that is applied constantly
// and does not depend on current route (unlike the layout)
//
// Gives the opportunity to add stateful providers on top of the app
// and these providers won't reset state when we navigate
//
// See https://github.com/ianaio/ianaio/issues/3919
export default function Root({children}: Props): JSX.Element {
  return <>{children}</>;
}
