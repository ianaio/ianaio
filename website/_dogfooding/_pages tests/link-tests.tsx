/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {useRef} from 'react';
import Link from '@ianaio/Link';
import Layout from '@theme/Layout';

export default function LinkTest(): JSX.Element {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  return (
    <Layout>
      <main className="container margin-vert--xl">
        <Link ref={anchorRef} to="/">
          A little link
        </Link>
        <button
          type="button"
          onClick={() => {
            anchorRef.current!.style.backgroundColor = 'red';
          }}>
          Change the link
        </button>
      </main>
    </Layout>
  );
}
