# EventBank shell

The host application of the [EventBank](https://github.com/marcelo-roman/eventbank-platform) micro-frontends. It owns the frame: top bar, navigation, routes and the visual theme. Every screen inside it comes from a remote that is built and deployed on its own.

| Route            | Remote           | Repository                                                                            |
| ---------------- | ---------------- | ------------------------------------------------------------------------------------- |
| `/accounts/*`    | `accounts/App`   | [eventbank-mfe-accounts](https://github.com/marcelo-roman/eventbank-mfe-accounts)     |
| `/transfers/*`   | `transfers/App`  | [eventbank-mfe-transfers](https://github.com/marcelo-roman/eventbank-mfe-transfers)   |
| `/projections/*` | `operations/App` | [eventbank-mfe-operations](https://github.com/marcelo-roman/eventbank-mfe-operations) |

## How remotes are loaded

Remotes are [Module Federation](https://module-federation.io) modules. The shell does not know their addresses at build time: on first navigation it reads `/config.json` and registers them with the federation runtime ([`remotes.ts`](src/remotes.ts)). In the container that file is written at startup from `ACCOUNTS_REMOTE_URL`, `TRANSFERS_REMOTE_URL` and `OPERATIONS_REMOTE_URL`, so a remote can move or ship a new version without rebuilding the shell.

`react`, `react-dom`, `react-router` and `@tanstack/react-query` are shared as singletons. Each remote mounts under the shell's router and brings its own query client.

Each remote renders inside a [`RemoteBoundary`](src/RemoteBoundary.tsx): if one is down, its area says so and the rest of the application keeps working.

## The contract with remotes

- Expose `./App` as a default-exported component that renders its routes relative to its mount path.
- Call the API with relative `/api/...` URLs; the shell's origin proxies them to the gateway.
- Style with the classes and custom properties in [`public/theme.css`](public/theme.css) (`--paper`, `--ink`, `--write`, `--read`, `.page`, `.panel`, `.button`, `.field`, `.status`, `.stream` …) and keep anything screen-specific in the remote.

## Running

```bash
pnpm install
pnpm dev          # http://localhost:5173, API proxied to the gateway on :5100
```

`public/config.json` points at the remotes on ports 5174 to 5176; start them with `pnpm dev` in their repositories. To run everything at once, use [eventbank-platform](https://github.com/marcelo-roman/eventbank-platform).

## License

[MIT](LICENSE)
