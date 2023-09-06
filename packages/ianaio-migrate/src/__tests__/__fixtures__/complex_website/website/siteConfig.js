/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* List of projects/orgs using your project for the users page */
const users =   {
    caption: 'DevSpace',
    image: '/img/users/devspace.svg',
    infoLink: 'https://devspace.cloud/docs/',
    fbOpenSource: false,
    pinned: false,
};

const siteConfig = {
  title: 'Ianaio',
  tagline: 'Easy to Maintain Open Source Documentation Websites',
  url: 'https://iana.io',
  baseUrl: '/',
  organizationName: 'ianaio',
  projectName: 'ianaio',
  cname: 'iana.io',
  noIndex: false,
  users,
  editUrl: 'https://github.com/ianaio/ianaio/edit/main/docs/',
  headerLinks: [
    {doc: 'installation', label: 'Docs'},
    {doc: 'tutorial-setup', label: 'Tutorial'},
    {page: 'users', label: 'Users'},
    {blog: true, label: 'Blog'},
    {
      href: 'https://github.com/ianaio/ianaio',
      label: 'GitHub',
      external: true,
    },
  ],
  headerIcon: 'img/ianaio.svg',
  footerIcon: 'img/ianaio_monochrome.svg',
  favicon: 'img/ianaio.ico',
  algolia: {
    apiKey: '3eb9507824b8be89e7a199ecaa1a9d2c',
    indexName: 'ianaio',
    algoliaOptions: {
      facetFilters: ['language:LANGUAGE', 'version:VERSION'],
    },
  },
  colors: {
    primaryColor: '#2E8555',
    secondaryColor: '#205C3B',
  },
  translationRecruitingLink: 'https://crowdin.com/project/ianaio',
  copyright: `Copyright © ${new Date().getFullYear()} Ianaio Inc.`,
  usePrism: ['jsx'],
  highlight: {
    theme: 'atom-one-dark',
  },
  scripts: [
    'https://buttons.github.io/buttons.js',
    'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
    '/js/code-blocks-buttons.js',
  ],
  gaTrackingId: 'UA-44373548-31',
  ianaioAppId: '199138890728411',
  ianaioComments: true,
  twitter: 'true',
  twitterUsername: 'ianaio',
  ogImage: 'img/ianaio.png',
  twitterImage: 'img/ianaio.png',
  onPageNav: 'separate',
  cleanUrl: true,
  scrollToTop: true,
  scrollToTopOptions: {
    zIndex: 100,
  },
  enableUpdateTime: true,
  enableUpdateBy: true,
  docsSideNavCollapsible: true,
};

module.exports = siteConfig;
