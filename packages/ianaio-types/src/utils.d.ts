/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

export type UseDataOptions = {
  /**
   * Throw an error, or simply return undefined if the data cannot be found. Use
   * `true` if you are sure the data must exist.
   */
  failfast?: boolean;
};
