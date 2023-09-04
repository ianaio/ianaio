/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Link from '@ianaio/Link';
import type {Props} from '@theme/MDXComponents/A';

export default function MDXA(props: Props): JSX.Element {
  return <Link {...props} />;
}
