/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {simpleHash, docuHash} from '../hashUtils';

describe('hashUtils', () => {
  it('simpleHash', () => {
    const asserts: {[key: string]: string} = {
      '': 'd41',
      '/foo-bar': '096',
      '/foo/bar': '1df',
      '/endi/lie': '9fa',
      '/endi-lie': 'fd3',
      '/cichyboom/tay': '48d',
      '/cichyboom-tay': 'f3b',
      '/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar':
        'd46',
      '/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/test1-test2':
        '787',
    };
    Object.keys(asserts).forEach((str) => {
      expect(simpleHash(str, 3)).toBe(asserts[str]);
    });
  });
});

describe('docuHash', () => {
  it('docuHash works', () => {
    const asserts: {[key: string]: string} = {
      '': '-d41',
      '/': 'index',
      '/foo-bar': 'foo-bar-096',
      '/foo/bar': 'foo-bar-1df',
      '/endi/lie': 'endi-lie-9fa',
      '/endi-lie': 'endi-lie-fd3',
      '/cichyboom/tay': 'cichyboom-tay-48d',
      '/cichyboom-tay': 'cichyboom-tay-f3b',
      '/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar':
        'foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo--d46',
      '/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/foo/bar/test1-test2':
        'foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-foo-bar-test-1-test--787',
    };
    Object.keys(asserts).forEach((file) => {
      expect(docuHash(file)).toBe(asserts[file]);
    });
  });
});
