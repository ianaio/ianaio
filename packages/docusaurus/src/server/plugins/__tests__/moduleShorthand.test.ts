/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {getNamePatterns, resolveModuleName} from '../moduleShorthand';

describe('getNamePatterns', () => {
  it('resolves plain names', () => {
    expect(getNamePatterns('awesome', 'plugin')).toEqual([
      'awesome',
      '@ianaio/plugin-awesome',
      'ianaio-plugin-awesome',
    ]);

    expect(getNamePatterns('awesome', 'theme')).toEqual([
      'awesome',
      '@ianaio/theme-awesome',
      'ianaio-theme-awesome',
    ]);
  });

  it('expands bare scopes', () => {
    expect(getNamePatterns('@joshcena', 'plugin')).toEqual([
      '@joshcena/ianaio-plugin',
    ]);

    expect(getNamePatterns('@joshcena', 'theme')).toEqual([
      '@joshcena/ianaio-theme',
    ]);
  });

  it('expands scoped names', () => {
    expect(getNamePatterns('@joshcena/awesome', 'plugin')).toEqual([
      '@joshcena/awesome',
      '@joshcena/ianaio-plugin-awesome',
    ]);

    expect(getNamePatterns('@joshcena/awesome', 'theme')).toEqual([
      '@joshcena/awesome',
      '@joshcena/ianaio-theme-awesome',
    ]);
  });

  it('expands deep scoped paths', () => {
    expect(getNamePatterns('@joshcena/awesome/web', 'plugin')).toEqual([
      '@joshcena/awesome/web',
      '@joshcena/ianaio-plugin-awesome/web',
    ]);

    expect(getNamePatterns('@joshcena/awesome/web', 'theme')).toEqual([
      '@joshcena/awesome/web',
      '@joshcena/ianaio-theme-awesome/web',
    ]);
  });
});

describe('resolveModuleName', () => {
  it('resolves longhand', () => {
    expect(
      resolveModuleName('@ianaio/plugin-content-docs', require, 'plugin'),
    ).toBeDefined();
  });

  it('resolves shorthand', () => {
    expect(resolveModuleName('content-docs', require, 'plugin')).toBeDefined();
  });

  it('throws good error message for longhand', () => {
    expect(() =>
      resolveModuleName('@ianaio/plugin-content-doc', require, 'plugin'),
    ).toThrowErrorMatchingInlineSnapshot(`
      "Ianaio was unable to resolve the "@ianaio/plugin-content-doc" plugin. Make sure one of the following packages are installed:
      - @ianaio/plugin-content-doc
      - @ianaio/ianaio-plugin-plugin-content-doc"
    `);
  });

  it('throws good error message for shorthand', () => {
    expect(() => resolveModuleName('content-doc', require, 'plugin'))
      .toThrowErrorMatchingInlineSnapshot(`
      "Ianaio was unable to resolve the "content-doc" plugin. Make sure one of the following packages are installed:
      - content-doc
      - @ianaio/plugin-content-doc
      - ianaio-plugin-content-doc"
    `);
  });
});
