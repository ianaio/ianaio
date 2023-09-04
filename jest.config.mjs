/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {fileURLToPath} from 'url';

process.env.TZ = 'UTC';

const ignorePatterns = [
  '/node_modules/',
  '__fixtures__',
  '__mocks__',
  '/testUtils.ts',
  '/packages/ianaio/lib',
  '/packages/ianaio-logger/lib',
  '/packages/ianaio-utils/lib',
  '/packages/ianaio-utils-common/lib',
  '/packages/ianaio-utils-validation/lib',
  '/packages/ianaio-plugin-content-blog/lib',
  '/packages/ianaio-plugin-content-docs/lib',
  '/packages/ianaio-plugin-content-pages/lib',
  '/packages/ianaio-theme-classic/lib',
  '/packages/ianaio-theme-common/lib',
  '/packages/ianaio-migrate/lib',
  '/jest',
  '/argos',
];

export default {
  rootDir: fileURLToPath(new URL('.', import.meta.url)),
  verbose: true,
  setupFiles: ['./jest/setup.js'],
  testEnvironmentOptions: {
    url: 'https://ianaio.io/',
  },
  testEnvironment: 'node',
  testPathIgnorePatterns: ignorePatterns,
  // Default 5s timeout often fails on Windows :s,
  // see https://github.com/ianaio/ianaio/pull/8259
  testTimeout: 15000,
  coveragePathIgnorePatterns: [
    ...ignorePatterns,
    // We also ignore all package entry points
    '/packages/ianaio-utils/src/index.ts',
  ],
  transform: {
    '^.+\\.[jt]sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
          },
          target: 'es2020',
        },
      },
    ],
  },
  errorOnDeprecated: true,
  reporters: ['default', 'github-actions'],
  moduleNameMapper: {
    // Jest can't resolve CSS or asset imports
    '^.+\\.(css|jpe?g|png|svg|webp)$': '<rootDir>/jest/emptyModule.ts',

    // Using src instead of lib, so we always get fresh source
    '@ianaio/(BrowserOnly|ComponentCreator|constants|ExecutionEnvironment|Head|Interpolate|isInternalUrl|Link|Noop|renderRoutes|router|Translate|use.*)':
      '@ianaio/core/src/client/exports/$1',

    // TODO create dedicated testing utility for mocking contexts
    // Maybe point to a fixture?
    '@generated/.*': '<rootDir>/jest/emptyModule.ts',
    // TODO use "projects" + multiple configs if we work on another theme?
    '@theme/(.*)': '@ianaio/theme-classic/src/theme/$1',
    '@site/(.*)': 'website/$1',

    // Using src instead of lib, so we always get fresh source
    '@ianaio/plugin-content-docs/client':
      '@ianaio/plugin-content-docs/src/client/index.ts',

    '@testing-utils/(.*)': '<rootDir>/jest/utils/$1.ts',

    // MDX packages are ESM-only and it is a pain to use in Jest
    // So we use them in Jest tests as CJS versions
    // see https://mdxjs.com/docs/troubleshooting-mdx/#problems-integrating-mdx
    '^unified$': '<rootDir>/jest/vendor/unified@11.0.2.js',
    '^@mdx-js/mdx$': '<rootDir>/jest/vendor/@mdx-js__mdx@2.1.5.js',
    '^remark$': '<rootDir>/jest/vendor/remark@14.0.2.js',
    '^remark-mdx$': '<rootDir>/jest/vendor/remark-mdx@2.1.5.js',
    '^remark-directive$': '<rootDir>/jest/vendor/remark-directive@2.0.1.js',
    '^remark-gfm$': '<rootDir>/jest/vendor/remark-gfm@3.0.1.js',
    '^estree-util-value-to-estree$':
      '<rootDir>/jest/vendor/estree-util-value-to-estree@2.1.0.js',
    '^mdast-util-to-string$':
      '<rootDir>/jest/vendor/mdast-util-to-string@3.1.0.js',
  },
  snapshotSerializers: [
    '<rootDir>/jest/snapshotPathNormalizer.ts',
    'jest-serializer-ansi-escapes',
    'jest-serializer-react-helmet-async',
  ],
  snapshotFormat: {
    escapeString: false,
    printBasicPrototype: false,
  },
};
