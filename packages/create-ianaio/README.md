# `create-ianaio`

Create Ianaio apps easily with simplified commands:

```bash
npm init ianaio
```

```bash
yarn create ianaio
```

## Usage

Please see the [installation documentation](https://iana.io/docs/installation).

## For maintainers

For Ianaio maintainers, templates can be tested with:

```bash
cd `git rev-parse --show-toplevel` # Back to repo root
rm -rf test-website
yarn create-ianaio test-website classic
cd test-website
yarn start
```

Note: `test-website` is not part of the workspace and use packages from npm.

Use the following to test the templates against local packages:

```bash
cd `git rev-parse --show-toplevel` # Back to repo root
rm -rf test-website-in-workspace
yarn create-ianaio test-website-in-workspace classic
cd test-website-in-workspace
yarn build
yarn start
```

For the TypeScript template:

```bash
cd `git rev-parse --show-toplevel` # Back to repo root
rm -rf test-website-in-workspace
yarn create-ianaio test-website-in-workspace classic --typescript
cd test-website-in-workspace
yarn typecheck
yarn build
yarn start
```
