/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {useEffect, useLayoutEffect} from 'react';
import ExecutionEnvironment from './ExecutionEnvironment';

/**
 * This hook is like `useLayoutEffect`, but without the SSR warning.
 * It seems hacky but it's used in many React libs (Redux, Formik...).
 * Also mentioned here: https://github.com/ianaio/react/issues/16956
 *
 * It is useful when you need to update a ref as soon as possible after a React
 * render (before `useEffect`).
 *
 * TODO should become unnecessary in React v19?
 * https://github.com/ianaio/react/pull/26395
 * This was added in core with Ianaio v3 but kept undocumented on purpose
 */
const useIsomorphicLayoutEffect = ExecutionEnvironment.canUseDOM
  ? useLayoutEffect
  : useEffect;

export default useIsomorphicLayoutEffect;
