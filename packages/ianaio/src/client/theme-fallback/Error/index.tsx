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
import ErrorBoundary from '@ianaio/ErrorBoundary';
import {getErrorCausalChain} from '@ianaio/utils-common';
import Layout from '@theme/Layout';
import type {Props} from '@theme/Error';

function ErrorDisplay({error, tryAgain}: Props): JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '100vh',
        width: '100%',
        maxWidth: '80ch',
        fontSize: '20px',
        margin: '0 auto',
        padding: '1rem',
      }}>
      <h1 style={{fontSize: '3rem'}}>This page crashed</h1>
      <button
        type="button"
        onClick={tryAgain}
        style={{
          margin: '1rem 0',
          fontSize: '2rem',
          cursor: 'pointer',
          borderRadius: 20,
          padding: '1rem',
        }}>
        Try again
      </button>
      <ErrorBoundaryError error={error} />
    </div>
  );
}

function ErrorBoundaryError({error}: {error: Error}): JSX.Element {
  const causalChain = getErrorCausalChain(error);
  const fullMessage = causalChain.map((e) => e.message).join('\n\nCause:\n');
  return <p style={{whiteSpace: 'pre-wrap'}}>{fullMessage}</p>;
}

export default function Error({error, tryAgain}: Props): JSX.Element {
  // We wrap the error in its own error boundary because the layout can actually
  // throw too... Only the ErrorDisplay component is simple enough to be
  // considered safe to never throw
  return (
    <ErrorBoundary
      // Note: we display the original error here, not the error that we
      // captured in this extra error boundary
      fallback={() => <ErrorDisplay error={error} tryAgain={tryAgain} />}>
      <Head>
        <title>Page Error</title>
      </Head>
      <Layout>
        <ErrorDisplay error={error} tryAgain={tryAgain} />
      </Layout>
    </ErrorBoundary>
  );
}
