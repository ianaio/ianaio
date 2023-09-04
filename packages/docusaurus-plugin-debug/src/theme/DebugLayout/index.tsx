/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {type ReactNode} from 'react';
import Head from '@ianaio/Head';
import Link from '@ianaio/Link';
import styles from './styles.module.css';

function DebugNavLink({to, children}: {to: string; children: ReactNode}) {
  return (
    <Link
      className={styles.navlink}
      isNavLink
      to={to}
      exact
      activeStyle={{
        backgroundColor: '#363739',
      }}>
      {children}
    </Link>
  );
}

export default function DebugLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <>
      <Head>
        <html lang="en" />
        <title>Ianaio debug panel</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div>
        <nav className={styles.nav}>
          <DebugNavLink to="/__ianaio/debug">Config</DebugNavLink>
          <DebugNavLink to="/__ianaio/debug/metadata">
            Metadata
          </DebugNavLink>
          <DebugNavLink to="/__ianaio/debug/registry">
            Registry
          </DebugNavLink>
          <DebugNavLink to="/__ianaio/debug/routes">Routes</DebugNavLink>
          <DebugNavLink to="/__ianaio/debug/content">Content</DebugNavLink>
          <DebugNavLink to="/__ianaio/debug/globalData">
            Global data
          </DebugNavLink>
        </nav>
        <main className={styles.container}>{children}</main>
      </div>
    </>
  );
}
