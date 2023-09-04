/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {useLocation} from '@ianaio/router';
import useIanaioContext from '@ianaio/useIanaioContext';

/**
 * Get the pathname of current route, without the optional site baseUrl.
 * - `/docs/myDoc` => `/docs/myDoc`
 * - `/baseUrl/docs/myDoc` => `/docs/myDoc`
 */
export function useLocalPathname(): string {
  const {
    siteConfig: {baseUrl},
  } = useIanaioContext();
  const {pathname} = useLocation();
  return pathname.replace(baseUrl, '/');
}
