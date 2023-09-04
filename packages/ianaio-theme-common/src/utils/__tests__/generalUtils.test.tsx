/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {renderHook} from '@testing-library/react-hooks';
import {Context} from '@ianaio/core/src/client/ianaioContext';
import {useTitleFormatter} from '../generalUtils';
import type {IanaioContext} from '@ianaio/types';

describe('useTitleFormatter', () => {
  const createUseTitleFormatterMock =
    (context: IanaioContext) => (title?: string) =>
      renderHook(() => useTitleFormatter(title), {
        wrapper: ({children}) => (
          <Context.Provider value={context}>{children}</Context.Provider>
        ),
      }).result.current;
  it('works', () => {
    const mockUseTitleFormatter = createUseTitleFormatterMock({
      siteConfig: {
        title: 'my site',
        titleDelimiter: '·',
      },
    } as IanaioContext);
    expect(mockUseTitleFormatter('a page')).toBe('a page · my site');
    expect(mockUseTitleFormatter(undefined)).toBe('my site');
    expect(mockUseTitleFormatter('    ')).toBe('my site');
  });
});
