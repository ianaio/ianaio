/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Joi,
  validateFrontMatter,
  FrontMatterTOCHeadingLevels,
  ContentVisibilitySchema,
  URISchema,
} from '@ianaio/utils-validation';
import type {PageFrontMatter} from '@ianaio/plugin-content-pages';

const PageFrontMatterSchema = Joi.object<PageFrontMatter>({
  // See https://github.com/ianaio/ianaio/issues/4591#issuecomment-822372398
  title: Joi.string().allow(''),
  // See https://github.com/ianaio/ianaio/issues/4591#issuecomment-822372398
  description: Joi.string().allow(''),
  keywords: Joi.array().items(Joi.string().required()),
  image: URISchema,
  wrapperClassName: Joi.string(),
  hide_table_of_contents: Joi.boolean(),
  ...FrontMatterTOCHeadingLevels,
}).concat(ContentVisibilitySchema);

export function validatePageFrontMatter(frontMatter: {
  [key: string]: unknown;
}): PageFrontMatter {
  return validateFrontMatter(frontMatter, PageFrontMatterSchema);
}
