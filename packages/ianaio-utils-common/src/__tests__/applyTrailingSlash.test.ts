/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import applyTrailingSlash, {
  type ApplyTrailingSlashParams,
} from '../applyTrailingSlash';

function params(
  trailingSlash: boolean | undefined,
  baseUrl: string = '/',
): ApplyTrailingSlashParams {
  return {trailingSlash, baseUrl};
}

describe('applyTrailingSlash', () => {
  it('applies to empty', () => {
    expect(applyTrailingSlash('', params(true))).toBe('/');
    expect(applyTrailingSlash('', params(false))).toBe('');
    expect(applyTrailingSlash('', params(undefined))).toBe('');
  });

  it('does not apply to /', () => {
    expect(applyTrailingSlash('/', params(true))).toBe('/');
    expect(applyTrailingSlash('/', params(false))).toBe('/');
    expect(applyTrailingSlash('/', params(undefined))).toBe('/');

    expect(applyTrailingSlash('/?query#anchor', params(true))).toBe(
      '/?query#anchor',
    );
    expect(applyTrailingSlash('/?query#anchor', params(false))).toBe(
      '/?query#anchor',
    );
    expect(applyTrailingSlash('/?query#anchor', params(undefined))).toBe(
      '/?query#anchor',
    );
  });

  it('does not apply to /baseUrl/', () => {
    const baseUrl = '/baseUrl/';
    expect(applyTrailingSlash('/baseUrl/', params(true, baseUrl))).toBe(
      '/baseUrl/',
    );
    expect(applyTrailingSlash('/baseUrl/', params(false, baseUrl))).toBe(
      '/baseUrl/',
    );
    expect(applyTrailingSlash('/baseUrl/', params(undefined, baseUrl))).toBe(
      '/baseUrl/',
    );

    expect(
      applyTrailingSlash('/baseUrl/?query#anchor', params(true, baseUrl)),
    ).toBe('/baseUrl/?query#anchor');
    expect(
      applyTrailingSlash('/baseUrl/?query#anchor', params(false, baseUrl)),
    ).toBe('/baseUrl/?query#anchor');
    expect(
      applyTrailingSlash('/baseUrl/?query#anchor', params(undefined, baseUrl)),
    ).toBe('/baseUrl/?query#anchor');
  });

  it('does not apply to #anchor links', () => {
    expect(applyTrailingSlash('#', params(true))).toBe('#');
    expect(applyTrailingSlash('#', params(false))).toBe('#');
    expect(applyTrailingSlash('#', params(undefined))).toBe('#');
    expect(applyTrailingSlash('#anchor', params(true))).toBe('#anchor');
    expect(applyTrailingSlash('#anchor', params(false))).toBe('#anchor');
    expect(applyTrailingSlash('#anchor', params(undefined))).toBe('#anchor');
  });

  it('applies to simple paths', () => {
    expect(applyTrailingSlash('abc', params(true))).toBe('abc/');
    expect(applyTrailingSlash('abc', params(false))).toBe('abc');
    expect(applyTrailingSlash('abc', params(undefined))).toBe('abc');
    expect(applyTrailingSlash('abc/', params(true))).toBe('abc/');
    expect(applyTrailingSlash('abc/', params(false))).toBe('abc');
    expect(applyTrailingSlash('abc/', params(undefined))).toBe('abc/');
    expect(applyTrailingSlash('/abc', params(true))).toBe('/abc/');
    expect(applyTrailingSlash('/abc', params(false))).toBe('/abc');
    expect(applyTrailingSlash('/abc', params(undefined))).toBe('/abc');
    expect(applyTrailingSlash('/abc/', params(true))).toBe('/abc/');
    expect(applyTrailingSlash('/abc/', params(false))).toBe('/abc');
    expect(applyTrailingSlash('/abc/', params(undefined))).toBe('/abc/');
  });

  it('applies to path with #anchor', () => {
    expect(applyTrailingSlash('/abc#anchor', params(true))).toBe(
      '/abc/#anchor',
    );
    expect(applyTrailingSlash('/abc#anchor', params(false))).toBe(
      '/abc#anchor',
    );
    expect(applyTrailingSlash('/abc#anchor', params(undefined))).toBe(
      '/abc#anchor',
    );
    expect(applyTrailingSlash('/abc/#anchor', params(true))).toBe(
      '/abc/#anchor',
    );
    expect(applyTrailingSlash('/abc/#anchor', params(false))).toBe(
      '/abc#anchor',
    );
    expect(applyTrailingSlash('/abc/#anchor', params(undefined))).toBe(
      '/abc/#anchor',
    );
  });

  it('applies to path with ?search', () => {
    expect(applyTrailingSlash('/abc?search', params(true))).toBe(
      '/abc/?search',
    );
    expect(applyTrailingSlash('/abc?search', params(false))).toBe(
      '/abc?search',
    );
    expect(applyTrailingSlash('/abc?search', params(undefined))).toBe(
      '/abc?search',
    );
    expect(applyTrailingSlash('/abc/?search', params(true))).toBe(
      '/abc/?search',
    );
    expect(applyTrailingSlash('/abc/?search', params(false))).toBe(
      '/abc?search',
    );
    expect(applyTrailingSlash('/abc/?search', params(undefined))).toBe(
      '/abc/?search',
    );
  });

  it('applies to path with ?search#anchor', () => {
    expect(applyTrailingSlash('/abc?search#anchor', params(true))).toBe(
      '/abc/?search#anchor',
    );
    expect(applyTrailingSlash('/abc?search#anchor', params(false))).toBe(
      '/abc?search#anchor',
    );
    expect(applyTrailingSlash('/abc?search#anchor', params(undefined))).toBe(
      '/abc?search#anchor',
    );
    expect(applyTrailingSlash('/abc/?search#anchor', params(true))).toBe(
      '/abc/?search#anchor',
    );
    expect(applyTrailingSlash('/abc/?search#anchor', params(false))).toBe(
      '/abc?search#anchor',
    );
    expect(applyTrailingSlash('/abc/?search#anchor', params(undefined))).toBe(
      '/abc/?search#anchor',
    );
  });

  it('applies to fully qualified urls', () => {
    expect(
      applyTrailingSlash('https://xyz.com/abc?search#anchor', params(true)),
    ).toBe('https://xyz.com/abc/?search#anchor');
    expect(
      applyTrailingSlash('https://xyz.com/abc?search#anchor', params(false)),
    ).toBe('https://xyz.com/abc?search#anchor');
    expect(
      applyTrailingSlash(
        'https://xyz.com/abc?search#anchor',
        params(undefined),
      ),
    ).toBe('https://xyz.com/abc?search#anchor');
    expect(
      applyTrailingSlash('https://xyz.com/abc/?search#anchor', params(true)),
    ).toBe('https://xyz.com/abc/?search#anchor');
    expect(
      applyTrailingSlash('https://xyz.com/abc/?search#anchor', params(false)),
    ).toBe('https://xyz.com/abc?search#anchor');
    expect(
      applyTrailingSlash(
        'https://xyz.com/abc/?search#anchor',
        params(undefined),
      ),
    ).toBe('https://xyz.com/abc/?search#anchor');
  });
});
