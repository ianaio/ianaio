/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import useIanaioContext from '@ianaio/useIanaioContext';
import {useLocation} from '@ianaio/router';
import {applyTrailingSlash} from '@ianaio/utils-common';

/**
 * Permits to obtain the url of the current page in another locale, useful to
 * generate hreflang meta headers etc...
 *
 * @see https://developers.google.com/search/docs/advanced/crawling/localized-versions
 */
export function useAlternatePageUtils(): {
  /**
   * Everything (pathname, base URL, etc.) is read from the context. Just tell
   * it which locale to link to and it will give you the alternate link for the
   * current page.
   */
  createUrl: ({
    /** The locale name to link to. */
    locale,
    /**
     * For hreflang SEO headers, we need it to be fully qualified (full
     * protocol/domain/path...); but for locale dropdowns, using a pathname is
     * good enough.
     */
    fullyQualified,
  }: {
    locale: string;
    fullyQualified: boolean;
  }) => string;
} {
  const {
    siteConfig: {baseUrl, url, trailingSlash},
    i18n: {defaultLocale, currentLocale},
  } = useIanaioContext();

  // TODO using useLocation().pathname is not a super idea
  // See https://github.com/ianaio/ianaio/issues/9170
  const {pathname} = useLocation();

  const canonicalPathname = applyTrailingSlash(pathname, {
    trailingSlash,
    baseUrl,
  });

  const baseUrlUnlocalized =
    currentLocale === defaultLocale
      ? baseUrl
      : baseUrl.replace(`/${currentLocale}/`, '/');

  const pathnameSuffix = canonicalPathname.replace(baseUrl, '');

  function getLocalizedBaseUrl(locale: string) {
    return locale === defaultLocale
      ? `${baseUrlUnlocalized}`
      : `${baseUrlUnlocalized}${locale}/`;
  }

  // TODO support correct alternate url when localized site is deployed on
  // another domain
  function createUrl({
    locale,
    fullyQualified,
  }: {
    locale: string;
    fullyQualified: boolean;
  }) {
    return `${fullyQualified ? url : ''}${getLocalizedBaseUrl(
      locale,
    )}${pathnameSuffix}`;
  }

  return {createUrl};
}
