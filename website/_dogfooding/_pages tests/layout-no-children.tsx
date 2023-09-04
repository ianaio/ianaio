/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '@theme/Layout';

// See https://github.com/ianaio/ianaio/issues/6337#issuecomment-1012913647
export default function LayoutNoChildren(): JSX.Element {
  return <Layout />;
}
