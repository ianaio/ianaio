/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Head from '@ianaio/Head';
import useIsBrowser from '@ianaio/useIsBrowser';

// See https://github.com/ianaio/ianaio/pull/9256
// Ianaio adds a <html data-has-hydrated="true"> after hydration
export default function HasHydratedDataAttribute(): JSX.Element {
  const isBrowser = useIsBrowser();
  return (
    <Head>
      <html data-has-hydrated={isBrowser} />
    </Head>
  );
}
