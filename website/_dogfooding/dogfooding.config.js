/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

/** @type {import('@ianaio/types').PluginConfig[]} */
const dogfoodingThemeInstances = [
  /** @type {import('@ianaio/types').PluginModule} */
  function swizzleThemeTests() {
    return {
      name: 'swizzle-theme-tests',
      getThemePath: () => './_swizzle_theme_tests/src/theme',
    };
  },
];
exports.dogfoodingThemeInstances = dogfoodingThemeInstances;

/** @type {import('@ianaio/types').PluginConfig[]} */
const dogfoodingPluginInstances = [
  [
    'content-docs', // Shorthand
    /** @type {import('@ianaio/plugin-content-docs').Options} */
    ({
      id: 'docs-tests',
      routeBasePath: '/tests/docs',
      sidebarPath: '_dogfooding/docs-tests-sidebars.js',
      versions: {
        current: {
          noIndex: true,
        },
      },

      // Using a _ prefix to test against an edge case regarding MDX partials: https://github.com/ianaio/ianaio/discussions/5181#discussioncomment-1018079
      path: '_dogfooding/_docs tests',
      showLastUpdateTime: true,
      showLastUpdateAuthor: true,
      sidebarItemsGenerator(args) {
        return args.defaultSidebarItemsGenerator({
          ...args,
          isCategoryIndex({fileName, directories}) {
            const eligibleDocIndexNames = [
              'index',
              'readme',
              directories[0].toLowerCase(),
              'intro',
            ];
            return eligibleDocIndexNames.includes(fileName.toLowerCase());
          },
        });
      },
    }),
  ],

  [
    '@ianaio/plugin-content-blog', // Longhand
    /** @type {import('@ianaio/plugin-content-blog').Options} */
    ({
      id: 'blog-tests',
      path: '_dogfooding/_blog tests',
      routeBasePath: '/tests/blog',
      editUrl:
        'https://github.com/ianaio/ianaio/edit/main/website/_dogfooding/_blog-tests',
      postsPerPage: 3,
      feedOptions: {
        type: 'all',
        title: 'Ianaio Tests Blog',
        copyright: `Copyright © ${new Date().getFullYear()} Ianaio, Inc.`,
      },
      readingTime: ({content, frontMatter, defaultReadingTime}) =>
        frontMatter.hide_reading_time
          ? undefined
          : defaultReadingTime({content, options: {wordsPerMinute: 5}}),
    }),
  ],

  [
    require.resolve('@ianaio/plugin-content-pages'), // Full path
    /** @type {import('@ianaio/plugin-content-pages').Options} */
    ({
      id: 'pages-tests',
      path: '_dogfooding/_pages tests',
      routeBasePath: '/tests/pages',
    }),
  ],

  /** @type {import('@ianaio/types').Plugin} */
  function clientModuleTestPlugin() {
    return {
      name: 'client-module-test-plugin',
      getClientModules() {
        return [
          require.resolve('./clientModuleExample.ts'),
          require.resolve('./clientModuleCSS.css'),
        ];
      },
    };
  },
];

exports.dogfoodingPluginInstances = dogfoodingPluginInstances;

exports.dogfoodingRedirects = [
  {
    from: ['/home/'],
    to: '/',
  },
  {
    from: ['/home/qs'],
    to: '/?a=1',
  },
  {
    from: ['/home/anchor'],
    to: '/#anchor',
  },
  {
    from: ['/home/absolute'],
    to: 'https://iana.io/',
  },
  {
    from: ['/home/absolute/qs'],
    to: 'https://iana.io/?a=1',
  },
  {
    from: ['/home/absolute/anchor'],
    to: 'https://iana.io/#anchor',
  },
];
