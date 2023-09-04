/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
We delay a bit the i18n staging deployment
Because sometimes, prod + i18n-staging call this script at the exact same time
And then both try to dl the translations at the same time, and then we have a
409 error. This delay makes sure prod starts to dl the translations in priority
Used in conjunction with waitForCrowdin.js (which is not enough)
 */

/**
 * @param {number} ms
 */
async function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

if (
  process.env.NETLIFY === 'true' &&
  process.env.SITE_NAME === 'ianaio-i18n-staging'
) {
  console.log(
    '[Crowdin] Delaying the ianaio-i18n-staging deployment to avoid 409 errors',
  );
  await delay(30000);
}
