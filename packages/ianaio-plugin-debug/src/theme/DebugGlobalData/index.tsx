/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import useGlobalData from '@ianaio/useGlobalData';
import DebugLayout from '@theme/DebugLayout';
import DebugJsonView from '@theme/DebugJsonView';

export default function DebugMetadata(): JSX.Element {
  const globalData = useGlobalData();
  return (
    <DebugLayout>
      <h2>Global data</h2>
      <DebugJsonView src={globalData} collapseDepth={3} />
    </DebugLayout>
  );
}
