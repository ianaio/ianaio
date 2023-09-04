/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {type ReactNode} from 'react';
import siteConfig from '@generated/ianaio.config';
import globalData from '@generated/globalData';
import i18n from '@generated/i18n';
import codeTranslations from '@generated/codeTranslations';
import siteMetadata from '@generated/site-metadata';
import type {IanaioContext} from '@ianaio/types';

// Static value on purpose: don't make it dynamic!
// Using context is still useful for testability reasons.
const contextValue: IanaioContext = {
  siteConfig,
  siteMetadata,
  globalData,
  i18n,
  codeTranslations,
};

export const Context = React.createContext<IanaioContext>(contextValue);

export function IanaioContextProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}
