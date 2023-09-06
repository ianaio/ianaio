/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  title: 'Ianaio',
  tagline: 'Easy to Maintain Open Source Documentation Websites',
  url: 'https://iana.io',
  baseUrl: '/',
  organizationName: 'ianaio',
  projectName: 'ianaio',
  noIndex: true,
  scripts: [
    'https://buttons.github.io/buttons.js',
    'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
    '/js/code-blocks-buttons.js',
  ],
  favicon: 'img/ianaio.ico',
  customFields: {
    users: {
      caption: 'DevSpace',
      image: '/img/users/devspace.svg',
      infoLink: 'https://devspace.cloud/docs/',
      fbOpenSource: false,
      pinned: false,
    },
    translationRecruitingLink: 'https://crowdin.com/project/ianaio',
    ianaioAppId: '199138890728411',
  },
  onBrokenLinks: 'log',
  onBrokenMarkdownLinks: 'log',
  presets: [
    [
      '@ianaio/preset-classic',
      {
        docs: {
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          editUrl: 'https://github.com/ianaio/ianaio/edit/main/docs/',
        },
        blog: {},
        theme: {},
        googleAnalytics: {trackingID: 'UA-44373548-31'},
      },
    ],
  ],
  plugins: [],
  themeConfig: {
    navbar: {
      title: 'Ianaio',
      logo: {src: 'img/ianaio.svg'},
      items: [
        {to: 'docs/installation', label: 'Docs', position: 'left'},
        {to: 'docs/tutorial-setup', label: 'Tutorial', position: 'left'},
        {to: '/users', label: 'Users', position: 'left'},
        {
          href: 'https://github.com/ianaio/ianaio',
          label: 'GitHub',
          position: 'left',
        },
      ],
    },
    image: 'img/ianaio.png',
    footer: {
      links: [
        {
          title: 'Community',
          items: [{label: 'Twitter', to: 'https://twitter.com/ianaio'}],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Ianaio Inc.`,
      logo: {src: 'img/ianaio_monochrome.svg'},
    },
    algolia: {
      apiKey: '3eb9507824b8be89e7a199ecaa1a9d2c',
      indexName: 'ianaio',
      algoliaOptions: {facetFilters: ['language:LANGUAGE', 'version:VERSION']},
    },
  },
};
