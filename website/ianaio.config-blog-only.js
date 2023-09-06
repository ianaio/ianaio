/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  title: 'Ianaio blog only!',
  tagline: 'Build optimized websites quickly, focus on your content',
  organizationName: 'ianaio',
  projectName: 'ianaio',
  baseUrl: '/blog-only/',
  url: 'https://iana.io',
  // We can only warn now, since we have blog pages linking to non-blog pages...
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/ianaio.ico',
  themes: ['live-codeblock'],
  plugins: ['ideal-image'],
  presets: [
    [
      'classic',
      {
        docs: false,
        pages: false,
        blog: {
          routeBasePath: '/',
          path: 'blog',
          editUrl: 'https://github.com/ianaio/ianaio/edit/main/website/',
          postsPerPage: 3,
          feedOptions: {
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} Ianaio, Inc.`,
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  themeConfig: {
    image: 'img/ianaio-social-card.jpg',
    algolia: {
      appId: 'X1Z85QJPUV',
      apiKey: 'bf7211c161e8205da2f933a02534105a',
      indexName: 'ianaio-2',
      contextualSearch: true,
    },
    navbar: {
      hideOnScroll: true,
      title: 'Ianaio',
      logo: {
        alt: 'Ianaio Logo',
        src: 'img/ianaio.svg',
        srcDark: 'img/ianaio_keytar.svg',
      },
    },
  },
};
