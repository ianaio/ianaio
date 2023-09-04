/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

// See https://github.com/ianaio/ianaio/issues/6337#issuecomment-1012913647
export default function Analytics(): JSX.Element {
  return (
    <Layout>
      <Heading as="h1">Test Analytics</Heading>
      <div>
        <button
          type="button"
          onClick={() => {
            window.gtag('event', 'ianaio-test-event', {
              event_category: 'ianaio-test-event-category"',
              event_label: 'ianaio-test-event-label',
            });

            const FALSE = false; // I don't want gtag to run with bad params
            if (FALSE) {
              // @ts-expect-error: gtag usage is type safe, failure expected
              window.gtag('this-does-not-exist');
            }
          }}>
          Submit custom gtag event!
        </button>
      </div>
    </Layout>
  );
}
