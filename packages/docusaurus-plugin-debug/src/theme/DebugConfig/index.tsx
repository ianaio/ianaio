/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import useIanaioContext from '@ianaio/useIanaioContext';
import DebugLayout from '@theme/DebugLayout';
import DebugJsonView from '@theme/DebugJsonView';

export default function DebugMetadata(): JSX.Element {
  const {siteConfig} = useIanaioContext();
  return (
    <DebugLayout>
      <h2>Site config</h2>
      <DebugJsonView src={siteConfig} collapseDepth={3} />
    </DebugLayout>
  );
}
