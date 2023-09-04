#!/usr/bin/env node
/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-check

import path from 'path';
import {createRequire} from 'module';
import logger from '@ianaio/logger';
import semver from 'semver';
import cli from 'commander';

const moduleRequire = createRequire(import.meta.url);
const requiredVersion = /** @type {import("../package.json")} */ (
  moduleRequire('../package.json')
).engines.node;

if (!semver.satisfies(process.version, requiredVersion)) {
  logger.error('Minimum Node.js version not met :(');
  logger.info`You are using Node.js number=${process.version}, Requirement: Node.js number=${requiredVersion}.`;
  process.exit(1);
}

// See https://github.com/ianaio/ianaio/pull/6860
const {migrateIanaioProject, migrateMDToMDX} =
  /** @type {import("../lib/index.js")} */ (moduleRequire('../lib/index.js'));

cli
  .command('migrate [siteDir] [newDir]')
  .option('--mdx', 'try to migrate MD to MDX too')
  .option('--page', 'try to migrate pages too')
  .description('Migrate between versions of Ianaio website.')
  .action(async (siteDir = '.', newDir = '.', {mdx, page} = {}) => {
    const sitePath = path.resolve(siteDir);
    const newSitePath = path.resolve(newDir);
    await migrateIanaioProject(sitePath, newSitePath, mdx, page);
  });

cli
  .command('mdx [siteDir] [newDir]')
  .description('Migrate markdown files to MDX.')
  .action(async (siteDir = '.', newDir = '.') => {
    const sitePath = path.resolve(siteDir);
    const newSitePath = path.resolve(newDir);
    await migrateMDToMDX(sitePath, newSitePath);
  });

cli.parse(process.argv);

if (!process.argv.slice(2).length) {
  cli.outputHelp();
}

process.on('unhandledRejection', (err) => {
  logger.error(err);
  process.exit(1);
});
