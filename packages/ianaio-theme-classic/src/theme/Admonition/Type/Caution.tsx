/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import Translate from '@ianaio/Translate';
import type {Props} from '@theme/Admonition/Type/Caution';
import AdmonitionLayout from '@theme/Admonition/Layout';
import IconCaution from '@theme/Admonition/Icon/Caution';

const infimaClassName = 'alert alert--warning';

const defaultProps = {
  icon: <IconCaution />,
  title: (
    <Translate
      id="theme.admonition.caution"
      description="The default label used for the Caution admonition (:::caution)">
      caution
    </Translate>
  ),
};

export default function AdmonitionTypeCaution(props: Props): JSX.Element {
  return (
    <AdmonitionLayout
      {...defaultProps}
      {...props}
      className={clsx(infimaClassName, props.className)}>
      {props.children}
    </AdmonitionLayout>
  );
}
