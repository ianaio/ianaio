/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {renderHook} from '@testing-library/react-hooks';
import useBaseUrl, {useBaseUrlUtils} from '../useBaseUrl';
import {Context} from '../../ianaioContext';
import type {IanaioContext} from '@ianaio/types';
import type {BaseUrlOptions} from '@ianaio/useBaseUrl';

const forcePrepend = {forcePrependBaseUrl: true};

describe('useBaseUrl', () => {
  const createUseBaseUrlMock =
    (context: IanaioContext) => (url: string, options?: BaseUrlOptions) =>
      renderHook(() => useBaseUrl(url, options), {
        wrapper: ({children}) => (
          <Context.Provider value={context}>{children}</Context.Provider>
        ),
      }).result.current;
  it('works with empty base URL', () => {
    const mockUseBaseUrl = createUseBaseUrlMock({
      siteConfig: {
        baseUrl: '/',
        url: 'https://iana.io',
      },
    } as IanaioContext);

    expect(mockUseBaseUrl('hello')).toBe('/hello');
    expect(mockUseBaseUrl('/hello')).toBe('/hello');
    expect(mockUseBaseUrl('hello/')).toBe('/hello/');
    expect(mockUseBaseUrl('/hello/')).toBe('/hello/');
    expect(mockUseBaseUrl('hello/foo')).toBe('/hello/foo');
    expect(mockUseBaseUrl('/hello/foo')).toBe('/hello/foo');
    expect(mockUseBaseUrl('hello/foo/')).toBe('/hello/foo/');
    expect(mockUseBaseUrl('/hello/foo/')).toBe('/hello/foo/');
    expect(mockUseBaseUrl('https://github.com')).toBe('https://github.com');
    expect(mockUseBaseUrl('//reactjs.org')).toBe('//reactjs.org');
    expect(mockUseBaseUrl('//reactjs.org', forcePrepend)).toBe('//reactjs.org');
    expect(mockUseBaseUrl('https://site.com', forcePrepend)).toBe(
      'https://site.com',
    );
    expect(mockUseBaseUrl('/hello/foo', {absolute: true})).toBe(
      'https://iana.io/hello/foo',
    );
    expect(mockUseBaseUrl('#hello')).toBe('#hello');
  });

  it('works with non-empty base URL', () => {
    const mockUseBaseUrl = createUseBaseUrlMock({
      siteConfig: {
        baseUrl: '/ianaio/',
        url: 'https://iana.io',
      },
    } as IanaioContext);

    expect(mockUseBaseUrl('')).toBe('');
    expect(mockUseBaseUrl('hello')).toBe('/ianaio/hello');
    expect(mockUseBaseUrl('/hello')).toBe('/ianaio/hello');
    expect(mockUseBaseUrl('hello/')).toBe('/ianaio/hello/');
    expect(mockUseBaseUrl('/hello/')).toBe('/ianaio/hello/');
    expect(mockUseBaseUrl('hello/foo')).toBe('/ianaio/hello/foo');
    expect(mockUseBaseUrl('/hello/foo')).toBe('/ianaio/hello/foo');
    expect(mockUseBaseUrl('hello/foo/')).toBe('/ianaio/hello/foo/');
    expect(mockUseBaseUrl('/hello/foo/')).toBe('/ianaio/hello/foo/');
    expect(mockUseBaseUrl('https://github.com')).toBe('https://github.com');
    expect(mockUseBaseUrl('//reactjs.org')).toBe('//reactjs.org');
    expect(mockUseBaseUrl('//reactjs.org', forcePrepend)).toBe('//reactjs.org');
    expect(mockUseBaseUrl('/hello', forcePrepend)).toBe('/ianaio/hello');
    expect(mockUseBaseUrl('https://site.com', forcePrepend)).toBe(
      'https://site.com',
    );
    expect(mockUseBaseUrl('/hello/foo', {absolute: true})).toBe(
      'https://iana.io/ianaio/hello/foo',
    );
    expect(mockUseBaseUrl('/ianaio')).toBe('/ianaio/');
    expect(mockUseBaseUrl('/ianaio/')).toBe('/ianaio/');
    expect(mockUseBaseUrl('/ianaio/hello')).toBe('/ianaio/hello');
    expect(mockUseBaseUrl('#hello')).toBe('#hello');
  });
});

describe('useBaseUrlUtils().withBaseUrl()', () => {
  const mockUseBaseUrlUtils = (context: IanaioContext) =>
    renderHook(() => useBaseUrlUtils(), {
      wrapper: ({children}) => (
        <Context.Provider value={context}>{children}</Context.Provider>
      ),
    }).result.current;
  it('empty base URL', () => {
    const {withBaseUrl} = mockUseBaseUrlUtils({
      siteConfig: {
        baseUrl: '/',
        url: 'https://iana.io',
      },
    } as IanaioContext);

    expect(withBaseUrl('hello')).toBe('/hello');
    expect(withBaseUrl('/hello')).toBe('/hello');
    expect(withBaseUrl('hello/')).toBe('/hello/');
    expect(withBaseUrl('/hello/')).toBe('/hello/');
    expect(withBaseUrl('hello/foo')).toBe('/hello/foo');
    expect(withBaseUrl('/hello/foo')).toBe('/hello/foo');
    expect(withBaseUrl('hello/foo/')).toBe('/hello/foo/');
    expect(withBaseUrl('/hello/foo/')).toBe('/hello/foo/');
    expect(withBaseUrl('https://github.com')).toBe('https://github.com');
    expect(withBaseUrl('//reactjs.org')).toBe('//reactjs.org');
    expect(withBaseUrl('//reactjs.org', forcePrepend)).toBe('//reactjs.org');
    expect(withBaseUrl('https://site.com', forcePrepend)).toBe(
      'https://site.com',
    );
    expect(withBaseUrl('/hello/foo', {absolute: true})).toBe(
      'https://iana.io/hello/foo',
    );
    expect(withBaseUrl('#hello')).toBe('#hello');
  });

  it('non-empty base URL', () => {
    const {withBaseUrl} = mockUseBaseUrlUtils({
      siteConfig: {
        baseUrl: '/ianaio/',
        url: 'https://iana.io',
      },
    } as IanaioContext);

    expect(withBaseUrl('hello')).toBe('/ianaio/hello');
    expect(withBaseUrl('/hello')).toBe('/ianaio/hello');
    expect(withBaseUrl('hello/')).toBe('/ianaio/hello/');
    expect(withBaseUrl('/hello/')).toBe('/ianaio/hello/');
    expect(withBaseUrl('hello/foo')).toBe('/ianaio/hello/foo');
    expect(withBaseUrl('/hello/foo')).toBe('/ianaio/hello/foo');
    expect(withBaseUrl('hello/foo/')).toBe('/ianaio/hello/foo/');
    expect(withBaseUrl('/hello/foo/')).toBe('/ianaio/hello/foo/');
    expect(withBaseUrl('https://github.com')).toBe('https://github.com');
    expect(withBaseUrl('//reactjs.org')).toBe('//reactjs.org');
    expect(withBaseUrl('//reactjs.org', forcePrepend)).toBe('//reactjs.org');
    expect(withBaseUrl('https://site.com', forcePrepend)).toBe(
      'https://site.com',
    );
    expect(withBaseUrl('/hello/foo', {absolute: true})).toBe(
      'https://iana.io/ianaio/hello/foo',
    );
    expect(withBaseUrl('/ianaio')).toBe('/ianaio/');
    expect(withBaseUrl('/ianaio/')).toBe('/ianaio/');
    expect(withBaseUrl('/ianaio/hello')).toBe('/ianaio/hello');
    expect(withBaseUrl('#hello')).toBe('#hello');
  });
});
