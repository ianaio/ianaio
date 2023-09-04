/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {ThemeClassNames} from '@ianaio/theme-common';
import {useDoc} from '@ianaio/theme-common/internal';

import TOC from '@theme/TOC';

export default function DocItemTOCDesktop(): JSX.Element {
  const {toc, frontMatter} = useDoc();
  return (
    <TOC
      toc={toc}
      minHeadingLevel={frontMatter.toc_min_heading_level}
      maxHeadingLevel={frontMatter.toc_max_heading_level}
      className={ThemeClassNames.docs.docTocDesktop}
    />
  );
}
