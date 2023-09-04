/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Link from '@ianaio/Link';
import {useActiveVersion} from '@ianaio/plugin-content-docs/client';
import Translate, {translate} from '@ianaio/Translate';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

type Props = {
  code: string;
  pluginName: string;
  presetOptionName: string;
};

const docsPluginId = undefined; // Default docs plugin instance

export default function ConfigTabs({
  code,
  pluginName,
  presetOptionName,
}: Props): JSX.Element {
  const versionPath = useActiveVersion(docsPluginId)!.path;

  return (
    <Tabs groupId="api-config-ex">
      <TabItem value="preset" label={translate({message: 'Preset options'})}>
        <p>
          <Translate
            id="apiDocs.configTabs.presetOptions.description"
            values={{
              presetLink: (
                <Link
                  to={`${versionPath}/using-plugins#ianaiopreset-classic`}>
                  <Translate>preset options</Translate>
                </Link>
              ),
            }}>
            {
              'If you use a preset, configure this plugin through the {presetLink}:'
            }
          </Translate>
        </p>
        <CodeBlock language="js" title="ianaio.config.js">
          {`module.exports = {
  presets: [
    [
      '@ianaio/preset-classic',
      {
        // highlight-start
        ${presetOptionName}: ${code.replace(/\n/g, '\n        ')},
        // highlight-end
      },
    ],
  ],
};`}
        </CodeBlock>
      </TabItem>
      <TabItem value="plugin" label={translate({message: 'Plugin options'})}>
        <p>
          <Translate>
            If you are using a standalone plugin, provide options directly to
            the plugin:
          </Translate>
        </p>
        <CodeBlock language="js" title="ianaio.config.js">
          {`module.exports = {
  plugins: [
    [
      '${pluginName}',
      // highlight-start
      ${code.replace(/\n/g, '\n      ')},
      // highlight-end
    ],
  ],
};`}
        </CodeBlock>
      </TabItem>
    </Tabs>
  );
}
