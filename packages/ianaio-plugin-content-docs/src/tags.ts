/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import _ from 'lodash';
import {getTagVisibility, groupTaggedItems} from '@ianaio/utils';
import type {VersionTags} from './types';
import type {DocMetadata} from '@ianaio/plugin-content-docs';

export function getVersionTags(docs: DocMetadata[]): VersionTags {
  const groups = groupTaggedItems(docs, (doc) => doc.tags);
  return _.mapValues(groups, ({tag, items: tagDocs}) => {
    const tagVisibility = getTagVisibility({
      items: tagDocs,
      isUnlisted: (item) => item.unlisted,
    });
    return {
      label: tag.label,
      docIds: tagVisibility.listedItems.map((item) => item.id),
      permalink: tag.permalink,
      unlisted: tagVisibility.unlisted,
    };
  });
}
