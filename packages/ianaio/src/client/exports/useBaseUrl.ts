/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {useCallback} from 'react';
import useIanaioContext from './useIanaioContext';
import {hasProtocol} from './isInternalUrl';
import type {BaseUrlOptions, BaseUrlUtils} from '@ianaio/useBaseUrl';

function addBaseUrl(
  siteUrl: string,
  baseUrl: string,
  url: string,
  {forcePrependBaseUrl = false, absolute = false}: BaseUrlOptions = {},
): string {
  // It never makes sense to add base url to a local anchor url, or one with a
  // protocol
  if (!url || url.startsWith('#') || hasProtocol(url)) {
    return url;
  }

  if (forcePrependBaseUrl) {
    return baseUrl + url.replace(/^\//, '');
  }

  // /baseUrl -> /baseUrl/
  // https://github.com/ianaio/ianaio/issues/6315
  if (url === baseUrl.replace(/\/$/, '')) {
    return baseUrl;
  }

  // We should avoid adding the baseurl twice if it's already there
  const shouldAddBaseUrl = !url.startsWith(baseUrl);

  const basePath = shouldAddBaseUrl ? baseUrl + url.replace(/^\//, '') : url;

  return absolute ? siteUrl + basePath : basePath;
}

export function useBaseUrlUtils(): BaseUrlUtils {
  const {
    siteConfig: {baseUrl, url: siteUrl},
  } = useIanaioContext();

  const withBaseUrl = useCallback(
    (url: string, options?: BaseUrlOptions) =>
      addBaseUrl(siteUrl, baseUrl, url, options),
    [siteUrl, baseUrl],
  );

  return {
    withBaseUrl,
  };
}

export default function useBaseUrl(
  url: string,
  options: BaseUrlOptions = {},
): string {
  const {withBaseUrl} = useBaseUrlUtils();
  return withBaseUrl(url, options);
}
