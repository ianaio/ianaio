/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import useIsBrowser from '@ianaio/useIsBrowser';
import {LiveProvider, LiveEditor, LiveError, LivePreview} from 'react-live';
import Translate from '@ianaio/Translate';
import useIanaioContext from '@ianaio/useIanaioContext';
import BrowserOnly from '@ianaio/BrowserOnly';
import {
  ErrorBoundaryTryAgainButton,
  usePrismTheme,
} from '@ianaio/theme-common';
import ErrorBoundary from '@ianaio/ErrorBoundary';

import type {Props} from '@theme/Playground';
import type {Props as ErrorProps} from '@theme/Error';
import type {ThemeConfig} from '@ianaio/theme-live-codeblock';

import styles from './styles.module.css';

function Header({children}: {children: React.ReactNode}) {
  return <div className={clsx(styles.playgroundHeader)}>{children}</div>;
}

function LivePreviewLoader() {
  // Is it worth improving/translating?
  // eslint-disable-next-line @ianaio/no-untranslated-text
  return <div>Loading...</div>;
}

function ErrorFallback({error, tryAgain}: ErrorProps): JSX.Element {
  return (
    <div className={styles.errorFallback}>
      <p>{error.message}</p>
      <ErrorBoundaryTryAgainButton onClick={tryAgain} />
    </div>
  );
}

function Preview() {
  // No SSR for the live preview
  // See https://github.com/ianaio/ianaio/issues/5747
  return (
    <BrowserOnly fallback={<LivePreviewLoader />}>
      {() => (
        <>
          <ErrorBoundary fallback={(params) => <ErrorFallback {...params} />}>
            <LivePreview />
          </ErrorBoundary>
          <LiveError />
        </>
      )}
    </BrowserOnly>
  );
}

function ResultWithHeader() {
  return (
    <>
      <Header>
        <Translate
          id="theme.Playground.result"
          description="The result label of the live codeblocks">
          Result
        </Translate>
      </Header>
      {/* https://github.com/ianaio/ianaio/issues/5747 */}
      <div className={styles.playgroundPreview}>
        <Preview />
      </div>
    </>
  );
}

function ThemedLiveEditor() {
  const isBrowser = useIsBrowser();
  return (
    <LiveEditor
      // We force remount the editor on hydration,
      // otherwise dark prism theme is not applied
      key={String(isBrowser)}
      className={styles.playgroundEditor}
    />
  );
}

function EditorWithHeader() {
  return (
    <>
      <Header>
        <Translate
          id="theme.Playground.liveEditor"
          description="The live editor label of the live codeblocks">
          Live Editor
        </Translate>
      </Header>
      <ThemedLiveEditor />
    </>
  );
}

export default function Playground({
  children,
  transformCode,
  ...props
}: Props): JSX.Element {
  const {
    siteConfig: {themeConfig},
  } = useIanaioContext();
  const {
    liveCodeBlock: {playgroundPosition},
  } = themeConfig as ThemeConfig;
  const prismTheme = usePrismTheme();

  const noInline = props.metastring?.includes('noInline') ?? false;

  return (
    <div className={styles.playgroundContainer}>
      {/* @ts-expect-error: type incompatibility with refs */}
      <LiveProvider
        code={children.replace(/\n$/, '')}
        noInline={noInline}
        transformCode={transformCode ?? ((code) => `${code};`)}
        theme={prismTheme}
        {...props}>
        {playgroundPosition === 'top' ? (
          <>
            <ResultWithHeader />
            <EditorWithHeader />
          </>
        ) : (
          <>
            <EditorWithHeader />
            <ResultWithHeader />
          </>
        )}
      </LiveProvider>
    </div>
  );
}
