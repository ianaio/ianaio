/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import IframeWindow from '@site/src/components/BrowserWindow/IframeWindow';

// See https://github.com/ianaio/ianaio/issues/8672
export default function Embeds(): JSX.Element {
  return (
    <Layout>
      <div style={{padding: 10}}>
        <Heading as="h1">Test Embeds</Heading>
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          <IframeWindow url="/?ianaio-theme=light" />
          <IframeWindow url="/?ianaio-theme=dark" />
          <IframeWindow url="/?ianaio-theme=unexpected-value" />
          <IframeWindow url="/" />
          <IframeWindow url="https://ianaio.io/" />
          <IframeWindow url="https://tutorial.ianaio.io/" />
        </div>
      </div>
    </Layout>
  );
}
