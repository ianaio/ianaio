/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import utils from '@ianaio/utils';

/**
 * @param {import('@ianaio/types').LoadContext} context
 * @returns {import('@ianaio/types').Plugin}
 */
export default function FeatureRequestsPlugin(context) {
  return {
    name: 'feature-requests-plugin',
    async contentLoaded({actions}) {
      const basePath = utils.normalizeUrl([
        context.baseUrl,
        '/feature-requests',
      ]);
      const paths = await actions.createData(
        'paths.json',
        JSON.stringify(basePath),
      );
      actions.addRoute({
        path: basePath,
        exact: false,
        component: '@site/src/plugins/featureRequests/FeatureRequestsPage',
        modules: {
          basePath: paths,
        },
      });
    },
  };
}
