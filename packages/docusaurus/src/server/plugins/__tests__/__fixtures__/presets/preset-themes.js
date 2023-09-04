/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = function preset(context, opts = {}) {
  return {
    themes: [
      ['@ianaio/theme-live-codeblock', opts.codeblock],
      ['@ianaio/theme-algolia', opts.algolia],
    ],
  };
};
