/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

/** Adds a given string prefix to `str`. */
export function addPrefix(str: string, prefix: string): string {
  return str.startsWith(prefix) ? str : `${prefix}${str}`;
}

/** Adds a given string suffix to `str`. */
export function addSuffix(str: string, suffix: string): string {
  return str.endsWith(suffix) ? str : `${str}${suffix}`;
}

/** Removes a given string suffix from `str`. */
export function removeSuffix(str: string, suffix: string): string {
  if (suffix === '') {
    // str.slice(0, 0) is ""
    return str;
  }
  return str.endsWith(suffix) ? str.slice(0, -suffix.length) : str;
}

/** Removes a given string prefix from `str`. */
export function removePrefix(str: string, prefix: string): string {
  return str.startsWith(prefix) ? str.slice(prefix.length) : str;
}

/**
 * `Array#map` for async operations where order matters.
 * @param array The array to traverse.
 * @param action An async action to be performed on every array item. Will be
 * awaited before working on the next.
 * @returns The list of results returned from every `action(item)`
 */
export async function mapAsyncSequential<T, R>(
  array: T[],
  action: (t: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = [];
  for (const t of array) {
    const result = await action(t);
    results.push(result);
  }
  return results;
}

/**
 * `Array#find` for async operations where order matters.
 * @param array The array to traverse.
 * @param predicate An async predicate to be called on every array item. Should
 * return a boolean indicating whether the currently element should be returned.
 * @returns The function immediately returns the first item on which `predicate`
 * returns `true`, or `undefined` if none matches the predicate.
 */
export async function findAsyncSequential<T>(
  array: T[],
  predicate: (t: T) => Promise<boolean>,
): Promise<T | undefined> {
  for (const t of array) {
    if (await predicate(t)) {
      return t;
    }
  }
  return undefined;
}
