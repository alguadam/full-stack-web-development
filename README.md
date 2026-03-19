# Pokémon Team Builder

> A static web app for building and analyzing Pokémon teams.

## Features

- Build teams of up to 6 Pokémon
- Select species, moves, abilities, and items
- EV/IV and nature editing
- Type coverage analysis
- Import/Export Pokémon Showdown format
- Offline support
- English and Spanish UI

## Prerequisites

- [Node.js >= 20.11.0 LTS](https://nodejs.org/en/download)
- [pnpm >= 10](https://pnpm.io/installation)

Verify your installation by running:

```bash
node --version   # should print v20.11.0 or higher
pnpm --version   # should print 10.x or higher
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

```bash
pnpm build
```

Static output is generated in the `build/` folder.

## Running & Debugging in VS Code

### Recommended extensions

- [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) (`svelte.svelte-vscode`)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) (`bradlc.vscode-tailwindcss`)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) (`dbaeumer.vscode-eslint`)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) (`esbenp.prettier-vscode`)

### Running the dev server

1. Open the integrated terminal (`Ctrl+` \` `).
2. Run `pnpm dev`.
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Launch configurations

Defined in `.vscode/launch.json`:

| Name | Description |
|------|-------------|
| **Launch Edge** | Opens Edge at `http://localhost:5173` with source-map debugging. Runs the `pnpm dev` task automatically. |
| **Launch Chrome** | Same as above but using Chrome. |

Both configurations use an isolated `userDataDir` so the debug browser doesn't interfere with your regular profile.

### Tasks

Defined in `.vscode/tasks.json`:

| Task | Description |
|------|-------------|
| **pnpm dev** | Starts the Vite dev server (background). Auto-launched by debug configs. |
| **pnpm build** | Production build to `build/` (default build task). |
| **pnpm check** | Runs `svelte-check` with TypeScript checking. |
| **pnpm lint** | Runs ESLint across the project. |
| **pnpm test** | Runs Vitest unit tests (single run). |
| **pnpm test:e2e** | Runs Playwright end-to-end tests. |

### Debugging

1. Open the **Run and Debug** panel (`Ctrl+Shift+D`).
2. Select **Launch Edge** (or **Launch Chrome**) and press **F5**.
3. The `pnpm dev` task starts automatically; VS Code opens the browser with source-map support.

## Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e
```

## Project Structure

```
.
├── src/
│   ├── app.html            # SvelteKit HTML shell
│   ├── app.css             # Tailwind base imports
│   ├── routes/
│   │   ├── +layout.svelte  # Root layout (imports app.css)
│   │   └── +page.svelte    # Home page
│   └── lib/
│       ├── types/          # Shared TypeScript types (Team, Species, Move…)
│       └── stores/         # Svelte stores (team, filters, dataset)
├── static/
│   └── data/               # Prebuilt JSON datasets (species, moves, etc.)
├── svelte.config.js        # SvelteKit config (adapter-static)
├── vite.config.ts          # Vite config
├── tailwind.config.js      # Tailwind config
├── tsconfig.json           # TypeScript strict config
└── package.json
```

## Credits & License

Pokémon and all related names are trademarks of Nintendo / Game Freak / The Pokémon Company. This project is not affiliated with or endorsed by them.

Data sourced from [PokéAPI](https://pokeapi.co/) (BSD-3-Clause) and [WikiDex](https://www.wikidex.net/) (CC-BY-SA 3.0).
