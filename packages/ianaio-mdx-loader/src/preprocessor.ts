/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  escapeMarkdownHeadingIds,
  unwrapMdxCodeBlocks,
  admonitionTitleToDirectiveLabel,
} from '@ianaio/utils';
import {normalizeAdmonitionOptions} from './remark/admonitions';
import type {Options} from './loader';

/**
 * Preprocess the string before passing it to MDX
 * This is not particularly recommended but makes it easier to upgrade to MDX 2
 */
export default function preprocessContent({
  fileContent: initialFileContent,
  filePath,
  markdownConfig,
  admonitions,
}: {
  fileContent: string;
  filePath: string;
  markdownConfig: Options['markdownConfig'];
  admonitions: Options['admonitions'] | undefined;
}): string {
  let fileContent = initialFileContent;
  if (markdownConfig.preprocessor) {
    fileContent = markdownConfig.preprocessor({
      fileContent,
      filePath,
    });
  }
  fileContent = unwrapMdxCodeBlocks(fileContent);
  if (markdownConfig.mdx1Compat.headingIds) {
    fileContent = escapeMarkdownHeadingIds(fileContent);
  }
  if (markdownConfig.mdx1Compat.admonitions && admonitions) {
    const {keywords} = normalizeAdmonitionOptions(admonitions);
    fileContent = admonitionTitleToDirectiveLabel(fileContent, keywords);
  }
  return fileContent;
}
