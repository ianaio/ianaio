/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

declare module '@philpl/buble' {
  import type {TransformOptions as OriginalTransformOptions} from 'buble';
  // eslint-disable-next-line import/no-extraneous-dependencies, no-restricted-syntax
  export * from 'buble';
  export const features: string[];
  export type TransformOptions = OriginalTransformOptions & {
    transforms?: OriginalTransformOptions['transforms'] & {
      asyncAwait?: boolean;
      getterSetter?: boolean;
    };
  };
}
