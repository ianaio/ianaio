/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

export type PluginOptions = {
  trackingID: string;
  anonymizeIP: boolean;
};

export type Options = Partial<PluginOptions>;
