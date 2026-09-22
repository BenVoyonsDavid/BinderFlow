# Bootstrap BinderFlow with the Wix CLI

BinderFlow should use the current unified Wix CLI rather than the deprecated legacy Wix CLI.

## Prerequisites

- Node.js 20.19 or newer
- npm
- A Wix developer account
- Git

## Recommended bootstrap flow

Because the Wix CLI registers an app in the Wix account and generates project-specific IDs, the initial scaffold should be created interactively on the developer machine.

From a temporary parent folder:

```powershell
npm create @wix/new@latest app
```

When prompted:

- App name: `BinderFlow`
- Package/project name: `binder-flow`

The CLI creates the official project structure and registers the app in Wix.

Then copy the generated Wix project files into this repository while preserving:

- `README.md`
- `docs/`
- `src/core/`

Do **not** replace the domain files in `src/core/`.

## Verify the project uses the current Wix CLI

The generated project should contain:

- `@wix/astro` in `devDependencies`
- `src/extensions.ts`
- `wix.config.json`

## Generate the first Dashboard Pages

Run the Wix generator and create these Dashboard Page extensions:

1. Dashboard
   - route: `dashboard`
2. Inventory
   - route: `inventory`
3. Binders
   - route: `binders`
4. Settings
   - route: `settings`

Wix Dashboard Pages are generated as a pair of files:

```text
<page-name>.extension.ts
<page-name>.tsx
```

The extension file contains page metadata such as ID, title, route and component. The TSX file contains the React page.

## Development

Start the local Wix development environment:

```powershell
npm install
npm run dev
```

If Wix requests a development site, select or create one.

## First implementation milestone

Once the official scaffold is committed, BinderFlow v0.1 should implement:

- Inventory dashboard
- Search and filters
- Card detail / variant selection
- Quantity
- Condition
- Sale price
- Acquisition cost
- Binder location
- Wix publication status

## Important

Do not manually invent values for:

- `appId`
- `projectId`
- Wix extension GUIDs

Let the Wix CLI create them.
