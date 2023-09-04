/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import '@generated/client-modules';

import routes from '@generated/routes';
import {useLocation} from '@ianaio/router';
import renderRoutes from '@ianaio/renderRoutes';
import Root from '@theme/Root';
import SiteMetadata from '@theme/SiteMetadata';
import normalizeLocation from './normalizeLocation';
import {BrowserContextProvider} from './browserContext';
import {IanaioContextProvider} from './ianaioContext';
import PendingNavigation from './PendingNavigation';
import BaseUrlIssueBanner from './BaseUrlIssueBanner';
import SiteMetadataDefaults from './SiteMetadataDefaults';

// TODO, quick fix for CSS insertion order
// eslint-disable-next-line import/order
import ErrorBoundary from '@ianaio/ErrorBoundary';
import HasHydratedDataAttribute from './hasHydratedDataAttribute';

export default function App(): JSX.Element {
  const routeElement = renderRoutes(routes);
  const location = useLocation();
  return (
    <ErrorBoundary>
      <IanaioContextProvider>
        <BrowserContextProvider>
          <Root>
            <SiteMetadataDefaults />
            <SiteMetadata />
            <BaseUrlIssueBanner />
            <PendingNavigation location={normalizeLocation(location)}>
              {routeElement}
            </PendingNavigation>
          </Root>
          <HasHydratedDataAttribute />
        </BrowserContextProvider>
      </IanaioContextProvider>
    </ErrorBoundary>
  );
}
