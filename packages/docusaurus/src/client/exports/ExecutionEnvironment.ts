/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

const canUseDOM =
  typeof window !== 'undefined' &&
  'document' in window &&
  'createElement' in window.document;

const ExecutionEnvironment = {
  canUseDOM,

  // window.attachEvent is IE-specific; it's very likely Ianaio won't work
  // on IE anyway.
  canUseEventListeners:
    canUseDOM && ('addEventListener' in window || 'attachEvent' in window),

  canUseIntersectionObserver: canUseDOM && 'IntersectionObserver' in window,

  canUseViewport: canUseDOM && 'screen' in window,
};

export default ExecutionEnvironment;
