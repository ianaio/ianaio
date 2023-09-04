/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Should we translate theme-fallback?
/* eslint-disable @ianaio/no-untranslated-text */

import React from 'react';
import Head from '@ianaio/Head';
import Layout from '@theme/Layout';

export default function NotFound(): JSX.Element {
  return (
    <>
      <Head>
        <title>Page Not Found</title>
      </Head>
      <Layout>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
            fontSize: '20px',
          }}>
          <h1>Oops, page not found </h1>
        </div>
      </Layout>
    </>
  );
}
