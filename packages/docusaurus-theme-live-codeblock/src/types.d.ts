/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

/// <reference types="@ianaio/theme-classic" />
/// <reference types="@ianaio/module-type-aliases" />

declare module '@theme-init/CodeBlock' {
  import type CodeBlock from '@theme/CodeBlock';
  import type {Props as BaseProps} from '@theme/CodeBlock';

  export interface Props extends BaseProps {
    live?: boolean;
  }
  const CodeBlockComp: typeof CodeBlock;
  export default CodeBlockComp;
}
