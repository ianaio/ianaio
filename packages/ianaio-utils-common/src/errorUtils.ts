/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */
type CausalChain = [Error, ...Error[]];

export function getErrorCausalChain(error: Error): CausalChain {
  if (error.cause) {
    return [error, ...getErrorCausalChain(error.cause as Error)];
  }
  return [error];
}
