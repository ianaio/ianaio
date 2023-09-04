/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {useDoc} from '@ianaio/theme-common/internal';
import DocPaginator from '@theme/DocPaginator';

/**
 * This extra component is needed, because <DocPaginator> should remain generic.
 * DocPaginator is used in non-docs contexts too: generated-index pages...
 */
export default function DocItemPaginator(): JSX.Element {
  const {metadata} = useDoc();
  return <DocPaginator previous={metadata.previous} next={metadata.next} />;
}
