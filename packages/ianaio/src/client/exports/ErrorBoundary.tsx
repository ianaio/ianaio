/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {type ReactNode} from 'react';
import ExecutionEnvironment from '@ianaio/ExecutionEnvironment';
import ThemeError from '@theme/Error';
import type {
  FallbackFunction,
  FallbackParams,
  Props,
} from '@ianaio/ErrorBoundary';

type State = {
  error: Error | null;
};

// eslint-disable-next-line react/function-component-definition
const DefaultFallback: FallbackFunction = (params) => (
  <ThemeError {...params} />
);

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {error: null};
  }

  override componentDidCatch(error: Error): void {
    // Catch errors in any components below and re-render with error message
    if (ExecutionEnvironment.canUseDOM) {
      this.setState({error});
    }
  }

  override render(): ReactNode {
    const {children} = this.props;
    const {error} = this.state;

    if (error) {
      const fallbackParams: FallbackParams = {
        error,
        tryAgain: () => this.setState({error: null}),
      };
      const fallback: FallbackFunction = this.props.fallback ?? DefaultFallback;
      return fallback(fallbackParams);
    }

    // See https://github.com/ianaio/ianaio/issues/6337#issuecomment-1012913647
    return children ?? null;
  }
}
