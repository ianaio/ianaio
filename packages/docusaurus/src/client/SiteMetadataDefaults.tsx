/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Head from '@ianaio/Head';
import useIanaioContext from '@ianaio/useIanaioContext';
import useBaseUrl from '@ianaio/useBaseUrl';

export default function SiteMetadataDefaults(): JSX.Element {
  const {
    siteConfig: {favicon, title, noIndex},
    i18n: {currentLocale, localeConfigs},
  } = useIanaioContext();
  const faviconUrl = useBaseUrl(favicon);
  const {htmlLang, direction: htmlDir} = localeConfigs[currentLocale]!;

  return (
    <Head>
      {/*
        charSet + generator are handled in the html templates
        See https://github.com/ianaio/ianaio/pull/7952
        <meta charSet="UTF-8" />
        <meta name="generator" content={`Ianaio v${ianaioVersion}`} />
      */}
      <html lang={htmlLang} dir={htmlDir} />
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {favicon && <link rel="icon" href={faviconUrl} />}
    </Head>
  );
}
