# Ianaio Theme Classic

The classic theme for Ianaio.

## Installation

Add `ianaio/theme-classic` to your package:

```bash
npm i @ianaio/theme-classic
# or
yarn add @ianaio/theme-classic
```

Modify your `ianaio.config.js`:

```diff
module.exports = {
  ...
+ themes: ['@ianaio/theme-classic'],
  ...
}
```

## Swizzling components

```bash
$ npm swizzle @ianaio/theme-classic [component name]
```

All components used by this theme can be found [here](https://github.com/ianaio/ianaio/tree/main/packages/ianaio-theme-classic/src/theme)
