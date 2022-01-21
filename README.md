# tabletop-simulator-ts-types

TypeScript type definitions for the Tabletop Simulator API for use with Typescript-to-Lua transpilers

## Usage

First, install this package.

`npm install tabletop-simulator-ts-types`

Then update your `tsconfig.json` to include `node_modules/tabletop-simulator-ts-types/types/`:

```json
{
  "include": ["src/**/*", "node_modules/tabletop-simulator-ts-types/types/*"]
}
```

## typescript-to-lua

While technically these definitions can be used with any transpiler that transpiles from Typescript to Lua, they were only tested with the [`typescript-to-lua` project](https://github.com/TypeScriptToLua/TypeScriptToLua). Specifically, using the `universal` target.
