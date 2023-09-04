/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {renderHook} from '@testing-library/react-hooks';
import {StaticRouter} from 'react-router-dom';
import {Context} from '@ianaio/core/src/client/ianaioContext';
import {useLocalPathname} from '../useLocalPathname';
import type {IanaioContext} from '@ianaio/types';

describe('useLocalPathname', () => {
  const createUseLocalPathnameMock =
    (context: IanaioContext) => (location: string) =>
      renderHook(() => useLocalPathname(), {
        wrapper: ({children}) => (
          <Context.Provider value={context}>
            <StaticRouter location={location}>{children}</StaticRouter>
          </Context.Provider>
        ),
      }).result.current;
  it('works for baseUrl: /', () => {
    const mockUseLocalPathname = createUseLocalPathnameMock({
      siteConfig: {baseUrl: '/'},
    } as IanaioContext);
    expect(mockUseLocalPathname('/foo')).toBe('/foo');
  });

  it('works for non-root baseUrl', () => {
    const mockUseLocalPathname = createUseLocalPathnameMock({
      siteConfig: {baseUrl: '/base/'},
    } as IanaioContext);
    expect(mockUseLocalPathname('/base/foo')).toBe('/foo');
  });
});
