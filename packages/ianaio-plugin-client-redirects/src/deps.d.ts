/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

// TODO incompatible declaration file
declare module 'eta' {
  export const defaultConfig: object;

  export function compile(
    template: string,
    options?: object,
  ): (data: object, config: object) => string;
}
