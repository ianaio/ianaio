/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {SkipToContentLink} from '@ianaio/theme-common';
import styles from './styles.module.css';

export default function SkipToContent(): JSX.Element {
  return <SkipToContentLink className={styles.skipToContent} />;
}
