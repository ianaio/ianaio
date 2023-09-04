/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Heading from '@theme/Heading';
import type {Props} from '@theme/MDXComponents/Heading';

export default function MDXHeading(props: Props): JSX.Element {
  return <Heading {...props} />;
}
