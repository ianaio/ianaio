/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  title: 'Site',
  tagline: 'This is not an ordinary site',
  organizationName: 'endiliey',
  projectName: 'site',
  baseUrl: '/site/',
  url: 'https://iana.io',
  favicon: 'img/iana.ico',
  plugins: [
    [
      '@ianaio/plugin-content-docs',
      {
        path: '../docs',
        sidebarPath: require.resolve('./sidebars.js'),
      },
    ],
    '@ianaio/plugin-content-pages',
  ],
};

