If you are developing the Ianaio core and you want a quick way to test your changes, you can use the Ianaio website itself as your testing area.

> For tips on testing other projects, see the [local testing of third-party projects doc](./local-third-party-project-testing.md).

## Testing

It is straightforward to test your Ianaio changes with Ianaio.

```bash
cd /path/to/ianaio-repo
yarn install
cd website
yarn start
```

## Debugging Locally

### VS Code

Use the following code in VS Code to enable breakpoints. Please ensure you have a later version of node for non-legacy debugging.

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Ianaio Start (Debug)",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}/website",
      "program": "${workspaceFolder}/website/node_modules/@ianaio/core/bin/ianaio.js",
      "args": ["start"]
    }
  ]
}
```

### Other Editors

Feel free to contribute debug instructions for other IDEs

### Observing changes

Note that since most packages are built with TypeScript, you would need to compile them every time to see the effect. Alternatively, you can run `yarn watch` inside the package directory to start an incremental build. Now that the server is running, you can make changes to the core Ianaio code and docs to see the effects on the Ianaio site. LiveReload will reflect changes to the local site in your browser, usually running at http://localhost:3000.
