/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

export function getNamePatterns(
  moduleName: string,
  moduleType: 'preset' | 'theme' | 'plugin',
): string[] {
  if (moduleName.startsWith('@')) {
    // Pure scope: `@scope` => `@scope/ianaio-plugin`
    if (!moduleName.includes('/')) {
      return [`${moduleName}/ianaio-${moduleType}`];
    }
    const [scope, packageName] = moduleName.split(/\/(?<rest>.*)/) as [
      string,
      string,
    ];
    return [
      `${scope}/${packageName}`,
      `${scope}/ianaio-${moduleType}-${packageName}`,
    ];
  }
  return [
    moduleName,
    `@ianaio/${moduleType}-${moduleName}`,
    `ianaio-${moduleType}-${moduleName}`,
  ];
}

export function resolveModuleName(
  moduleName: string,
  moduleRequire: NodeRequire,
  moduleType: 'preset' | 'theme' | 'plugin',
): string {
  const modulePatterns = getNamePatterns(moduleName, moduleType);
  const module = modulePatterns.find((m) => {
    try {
      moduleRequire.resolve(m);
      return true;
    } catch {
      return false;
    }
  });
  if (!module) {
    throw new Error(`Ianaio was unable to resolve the "${moduleName}" ${moduleType}. Make sure one of the following packages are installed:
${modulePatterns.map((m) => `- ${m}`).join('\n')}`);
  }
  return module;
}
