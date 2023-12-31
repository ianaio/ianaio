/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

/// <reference types="@ianaio/theme-classic" />
/// <reference types="@ianaio/module-type-aliases" />

declare module '@ianaio/theme-live-codeblock' {
  export type ThemeConfig = {
    liveCodeBlock: {
      playgroundPosition: 'top' | 'bottom';
    };
  };
}

declare module '@theme/Playground' {
  import type {Props as BaseProps} from '@theme/CodeBlock';
  import type {LiveProviderProps} from 'react-live';

  type CodeBlockProps = Omit<BaseProps, 'className' | 'language' | 'title'>;

  export interface Props extends CodeBlockProps, LiveProviderProps {
    children: string;
  }
  export default function Playground(props: LiveProviderProps): JSX.Element;
}

declare module '@theme/ReactLiveScope' {
  type Scope = {
    [key: string]: unknown;
  };

  const ReactLiveScope: Scope;
  export default ReactLiveScope;
}
