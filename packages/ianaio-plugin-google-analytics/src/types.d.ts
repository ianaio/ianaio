/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

/// <reference types="@ianaio/module-type-aliases" />

interface Window {
  ga: (command: string, ...fields: string[]) => void;
}
