/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  title: 'Hello',
  tagline: 'Hello World',
  organizationName: 'endiliey',
  projectName: 'hello',
  baseUrl: '/',
  url: 'https://ianaio.io',
  favicon: 'img/ianaio.ico',
  plugins: [
    [
      '@ianaio/plugin-content-docs',
      {
        path: '../docs',
      },
    ],
    '@ianaio/plugin-content-pages',
  ],
  clientModules: [
    'foo.js'
  ]
};
