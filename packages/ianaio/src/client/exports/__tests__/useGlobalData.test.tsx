/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {renderHook} from '@testing-library/react-hooks';
import useGlobalData, {
  useAllPluginInstancesData,
  usePluginData,
} from '../useGlobalData';
import {Context} from '../../ianaioContext';
import type {IanaioContext} from '@ianaio/types';

describe('useGlobalData', () => {
  it('returns global data from context', () => {
    expect(
      renderHook(() => useGlobalData(), {
        wrapper: ({children}) => (
          <Context.Provider
            value={{globalData: {foo: 'bar'}} as unknown as IanaioContext}>
            {children}
          </Context.Provider>
        ),
      }).result.current,
    ).toEqual({foo: 'bar'});
  });
});

describe('useAllPluginInstancesData', () => {
  it('returns plugin data namespace', () => {
    expect(
      renderHook(() => useAllPluginInstancesData('foo'), {
        wrapper: ({children}) => (
          <Context.Provider
            value={
              {
                globalData: {foo: {default: 'default', bar: 'bar'}},
              } as unknown as IanaioContext
            }>
            {children}
          </Context.Provider>
        ),
      }).result.current,
    ).toEqual({default: 'default', bar: 'bar'});
  });

  it('throws when plugin data not found', () => {
    expect(
      () =>
        renderHook(() => useAllPluginInstancesData('bar', {failfast: true}), {
          wrapper: ({children}) => (
            <Context.Provider
              value={
                {
                  globalData: {foo: {default: 'default', bar: 'bar'}},
                } as unknown as IanaioContext
              }>
              {children}
            </Context.Provider>
          ),
        }).result.current,
    ).toThrowErrorMatchingInlineSnapshot(
      `"Ianaio plugin global data not found for "bar" plugin."`,
    );
  });
});

describe('usePluginData', () => {
  it('returns plugin instance data', () => {
    expect(
      renderHook(() => usePluginData('foo', 'bar'), {
        wrapper: ({children}) => (
          <Context.Provider
            value={
              {
                globalData: {foo: {default: 'default', bar: 'bar'}},
              } as unknown as IanaioContext
            }>
            {children}
          </Context.Provider>
        ),
      }).result.current,
    ).toBe('bar');
  });

  it('defaults to default ID', () => {
    expect(
      renderHook(() => usePluginData('foo'), {
        wrapper: ({children}) => (
          <Context.Provider
            value={
              {
                globalData: {foo: {default: 'default', bar: 'bar'}},
              } as unknown as IanaioContext
            }>
            {children}
          </Context.Provider>
        ),
      }).result.current,
    ).toBe('default');
  });

  it('throws when plugin instance data not found', () => {
    expect(
      () =>
        renderHook(() => usePluginData('foo', 'baz', {failfast: true}), {
          wrapper: ({children}) => (
            <Context.Provider
              value={
                {
                  globalData: {foo: {default: 'default', bar: 'bar'}},
                } as unknown as IanaioContext
              }>
              {children}
            </Context.Provider>
          ),
        }).result.current,
    ).toThrowErrorMatchingInlineSnapshot(
      `"Ianaio plugin global data not found for "foo" plugin with id "baz"."`,
    );
  });
});
