/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {useLocation} from '@ianaio/router';
import Head from '@ianaio/Head';
import ExecutionEnvironment from '@ianaio/ExecutionEnvironment';
import useIanaioContext from '@ianaio/useIanaioContext';

// Double-security: critical CSS will hide the banner if CSS can load!
import './styles.module.css';

// __ prefix allows search crawlers (Algolia/DocSearch) to ignore anchors
// https://github.com/ianaio/ianaio/issues/8883#issuecomment-1516328368
const BannerContainerId = '__ianaio-base-url-issue-banner-container';
const BannerId = '__ianaio-base-url-issue-banner';
const SuggestionContainerId =
  '__ianaio-base-url-issue-banner-suggestion-container';

// It is important to not use React to render this banner
// otherwise Google would index it, even if it's hidden with some critical CSS!
// See https://github.com/ianaio/ianaio/issues/4028
// - We can't SSR (or it would be indexed)
// - We can't CSR (as it means the baseurl is correct)
function createInlineHtmlBanner(baseUrl: string) {
  return `
<div id="${BannerId}" style="border: thick solid red; background-color: rgb(255, 230, 179); margin: 20px; padding: 20px; font-size: 20px;">
   <p style="font-weight: bold; font-size: 30px;">Your Ianaio site did not load properly.</p>
   <p>A very common reason is a wrong site <a href="https://ianaio.io/docs/ianaio.config.js/#baseUrl" style="font-weight: bold;">baseUrl configuration</a>.</p>
   <p>Current configured baseUrl = <span style="font-weight: bold; color: red;">${baseUrl}</span> ${
    baseUrl === '/' ? ' (default value)' : ''
  }</p>
   <p>We suggest trying baseUrl = <span id="${SuggestionContainerId}" style="font-weight: bold; color: green;"></span></p>
</div>
`;
}

// Needs to work for older browsers!
function createInlineScript(baseUrl: string) {
  /* language=js */
  return `
document.addEventListener('DOMContentLoaded', function maybeInsertBanner() {
  var shouldInsert = typeof window['ianaio'] === 'undefined';
  shouldInsert && insertBanner();
});

function insertBanner() {
  var bannerContainer = document.createElement('div');
  bannerContainer.id = '${BannerContainerId}';
  var bannerHtml = ${JSON.stringify(createInlineHtmlBanner(baseUrl))
    // See https://redux.js.org/recipes/server-rendering/#security-considerations
    .replace(/</g, '\\\u003c')};
  bannerContainer.innerHTML = bannerHtml;
  document.body.prepend(bannerContainer);
  var suggestionContainer = document.getElementById('${SuggestionContainerId}');
  var actualHomePagePath = window.location.pathname;
  var suggestedBaseUrl = actualHomePagePath.substr(-1) === '/'
        ? actualHomePagePath
        : actualHomePagePath + '/';
  suggestionContainer.innerHTML = suggestedBaseUrl;
}
`;
}

function BaseUrlIssueBanner() {
  const {
    siteConfig: {baseUrl},
  } = useIanaioContext();

  return (
    <>
      {!ExecutionEnvironment.canUseDOM && (
        // Safe to use `ExecutionEnvironment`, because `Head` is purely
        // side-effect and doesn't affect hydration
        <Head>
          <script>{createInlineScript(baseUrl)}</script>
        </Head>
      )}
    </>
  );
}

/**
 * We want to help the users with a bad baseUrl configuration (very common
 * error). Help message is inlined, and hidden if JS or CSS is able to load.
 *
 * This component only inserts the base URL banner for the homepage, to avoid
 * polluting every statically rendered page.
 *
 * Note: it might create false positives (ie network failures): not a big deal
 *
 * @see https://github.com/ianaio/ianaio/pull/3621
 */
export default function MaybeBaseUrlIssueBanner(): JSX.Element | null {
  const {
    siteConfig: {baseUrl, baseUrlIssueBanner},
  } = useIanaioContext();
  const {pathname} = useLocation();
  const isHomePage = pathname === baseUrl;
  const enabled = baseUrlIssueBanner && isHomePage;
  return enabled ? <BaseUrlIssueBanner /> : null;
}
