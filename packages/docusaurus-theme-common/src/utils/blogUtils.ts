/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {useMemo} from 'react';
import {useLocation} from '@ianaio/router';
import {isSamePath} from './routesUtils';
import type {BlogSidebarItem} from '@ianaio/plugin-content-blog';

function isVisible(item: BlogSidebarItem, pathname: string): boolean {
  if (item.unlisted && !isSamePath(item.permalink, pathname)) {
    return false;
  }
  return true;
}

/**
 * Return the visible blog sidebar items to display.
 * Unlisted items are filtered.
 */
export function useVisibleBlogSidebarItems(
  items: BlogSidebarItem[],
): BlogSidebarItem[] {
  const {pathname} = useLocation();
  return useMemo(
    () => items.filter((item) => isVisible(item, pathname)),
    [items, pathname],
  );
}
