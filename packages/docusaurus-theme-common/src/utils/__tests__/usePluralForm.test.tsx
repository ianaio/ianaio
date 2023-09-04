/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {jest} from '@jest/globals';
import React from 'react';
import {renderHook} from '@testing-library/react-hooks';
import {Context} from '@ianaio/core/src/client/ianaioContext';
import {usePluralForm} from '../usePluralForm';
import type {IanaioContext} from '@ianaio/types';

describe('usePluralForm', () => {
  const createUsePluralFormMock = (context: IanaioContext) => () =>
    renderHook(() => usePluralForm(), {
      wrapper: ({children}) => (
        <Context.Provider value={context}>{children}</Context.Provider>
      ),
    }).result.current;
  it('returns the right plural', () => {
    const mockUsePluralForm = createUsePluralFormMock({
      i18n: {
        currentLocale: 'en',
      },
    } as IanaioContext);
    expect(mockUsePluralForm().selectMessage(1, 'one|many')).toBe('one');
    expect(mockUsePluralForm().selectMessage(10, 'one|many')).toBe('many');
  });

  it('warns against too many plurals', () => {
    const mockUsePluralForm = createUsePluralFormMock({
      i18n: {
        currentLocale: 'zh-Hans',
      },
    } as IanaioContext);
    const consoleMock = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    expect(mockUsePluralForm().selectMessage(1, 'one|many')).toBe('one');
    expect(mockUsePluralForm().selectMessage(10, 'one|many')).toBe('one');
    expect(consoleMock.mock.calls[0]![0]).toMatchInlineSnapshot(
      `"For locale=zh-Hans, a maximum of 1 plural forms are expected (other), but the message contains 2: one|many"`,
    );
  });

  it('uses the last with not enough plurals', () => {
    const mockUsePluralForm = createUsePluralFormMock({
      i18n: {
        currentLocale: 'en',
      },
    } as IanaioContext);
    expect(mockUsePluralForm().selectMessage(10, 'many')).toBe('many');
  });

  it('falls back when Intl.PluralForms is not available', () => {
    const mockUsePluralForm = createUsePluralFormMock({
      i18n: {
        currentLocale: 'zh-Hans',
      },
    } as IanaioContext);
    const consoleMock = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const pluralMock = jest
      .spyOn(Intl, 'PluralRules')
      // @ts-expect-error: for testing when it doesn't exist
      .mockImplementation(() => undefined);
    expect(mockUsePluralForm().selectMessage(1, 'one|many')).toBe('one');
    expect(mockUsePluralForm().selectMessage(10, 'one|many')).toBe('many');
    expect(consoleMock.mock.calls[0]![0]).toMatchInlineSnapshot(`
      "Failed to use Intl.PluralRules for locale "zh-Hans".
      Ianaio will fallback to the default (English) implementation.
      Error: pluralRules.resolvedOptions is not a function
      "
    `);
    pluralMock.mockRestore();
  });
});
