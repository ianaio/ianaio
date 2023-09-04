/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import useIanaioContext from '@ianaio/useIanaioContext';

/**
 * Formats the page's title based on relevant site config and other contexts.
 */
export function useTitleFormatter(title?: string | undefined): string {
  const {siteConfig} = useIanaioContext();
  const {title: siteTitle, titleDelimiter} = siteConfig;
  return title?.trim().length
    ? `${title.trim()} ${titleDelimiter} ${siteTitle}`
    : siteTitle;
}
