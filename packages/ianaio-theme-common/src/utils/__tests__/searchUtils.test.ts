/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {docVersionSearchTag} from '../searchUtils';

describe('docVersionSearchTag', () => {
  it('works', () => {
    expect(docVersionSearchTag('foo', 'bar')).toBe('docs-foo-bar');
  });
});
