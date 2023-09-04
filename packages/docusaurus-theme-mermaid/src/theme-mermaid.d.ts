/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

/// <reference types="@ianaio/module-type-aliases" />

declare module '@ianaio/theme-mermaid' {
  import type {DeepPartial} from 'utility-types';
  import type mermaidAPI from 'mermaid/mermaidAPI';
  import type {Plugin} from '@ianaio/types';

  export type ThemeConfig = {
    mermaid: {
      theme: {
        light: mermaidAPI.Theme;
        dark: mermaidAPI.Theme;
      };
      options: mermaidAPI.Config;
    };
  };
  export type UserThemeConfig = DeepPartial<ThemeConfig>;

  export default function themeMermaid(): Plugin<undefined>;
}

declare module '@theme/Mermaid' {
  export interface Props {
    value: string;
  }

  export default function Mermaid(props: Props): JSX.Element;
}
