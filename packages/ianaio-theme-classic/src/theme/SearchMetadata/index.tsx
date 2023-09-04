/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import Head from '@ianaio/Head';
import type {Props} from '@theme/SearchMetadata';

// Note: we bias toward using Algolia metadata on purpose
// Not doing so leads to confusion in the community,
// as it requires to first crawl the site with the Algolia plugin enabled first
// - https://github.com/ianaio/ianaio/issues/6693
// - https://github.com/ianaio/ianaio/issues/4555
export default function SearchMetadata({
  locale,
  version,
  tag,
}: Props): JSX.Element {
  // Seems safe to consider here the locale is the language, as the existing
  // docsearch:language filter is afaik a regular string-based filter
  const language = locale;

  return (
    <Head>
      {/*
      Ianaio metadata, used by third-party search plugin
      See https://github.com/cmfcmf/ianaio-search-local/issues/99
      */}
      {locale && <meta name="ianaio_locale" content={locale} />}
      {version && <meta name="ianaio_version" content={version} />}
      {tag && <meta name="ianaio_tag" content={tag} />}

      {/* Algolia DocSearch metadata */}
      {language && <meta name="docsearch:language" content={language} />}
      {version && <meta name="docsearch:version" content={version} />}
      {tag && <meta name="docsearch:ianaio_tag" content={tag} />}
    </Head>
  );
}
