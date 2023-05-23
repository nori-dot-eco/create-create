# `@nori-dot-com/create-create`

Get up and running quickly with Nori by using a `@nori-dot-com/create` CLI tool. This tool interactively scaffolds a new Nori-integrated project for you so you can start building instantly without the hassle of setting up `git`, installing packages, worrying about TypeScript configuration, etc.

To get started, `@nori-dot-com/create` can be instantiated with one of your favorite package managers:

```bash
yarn create @nori-dot-com/create
# or
npm init @nori-dot-com/create
# or
pnpm create @nori-dot-com/create
```

## Templates

`@nori-dot-com/create` currently comes with the following templates:

**Next.js**

- `next` (default): A Next.js wagmi project.

## Options

### --template/-t

Specify a [custom template](#templates) to bootstrap the app with.

### --yarn

Use yarn as the package manager for the app.

### --npm

Use npm as the package manager for the app.

### --pnpm

Use pnpm as the package manager for the app.

### --skip-git

Skips initializing the project as a git repository

## Credits

Adapted from [create-wagmi](https://github.com/wagmi-dev/create-wagmi).

## Internal

### Publishing

Note: to publish this package to npm, you have to first remove the workspaces entry in the package.json
