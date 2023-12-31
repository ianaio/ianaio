/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import path from 'path';
import {mergeWithCustomize} from 'webpack-merge';
import {loadSetup} from './testUtils';
import type {Props} from '@ianaio/types';
import type {DeepPartial} from 'utility-types';

describe('load', () => {
  it('loads props for site with custom i18n path', async () => {
    const props = await loadSetup('custom-i18n-site');
    expect(props).toMatchSnapshot();
    const props2 = await loadSetup('custom-i18n-site', {locale: 'zh-Hans'});
    expect(props2).toEqual(
      mergeWithCustomize<DeepPartial<Props>>({
        customizeArray(a, b, key) {
          return ['routesPaths', 'plugins'].includes(key) ? b : undefined;
        },
      })(props, {
        baseUrl: '/zh-Hans/',
        i18n: {
          currentLocale: 'zh-Hans',
        },
        localizationDir: path.join(
          __dirname,
          '__fixtures__/custom-i18n-site/i18n/zh-Hans-custom',
        ),
        outDir: path.join(
          __dirname,
          '__fixtures__/custom-i18n-site/build/zh-Hans',
        ),
        routesPaths: ['/zh-Hans/404.html'],
        siteConfig: {
          baseUrl: '/zh-Hans/',
        },
        plugins: props2.plugins,
      }),
    );
  });
});
