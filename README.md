# EventBank shell

The host application of the [EventBank](https://github.com/marcelo-roman/eventbank-platform) micro-frontends. It owns the frame (top bar, navigation, routes, theme) and the session: it signs people in with Keycloak and hands each remote what it needs to call the API.

## Signing in

The shell is the `eventbank-web` public client in [eventbank-identity](https://github.com/marcelo-roman/eventbank-identity) and uses [`oidc-client-ts`](https://github.com/authts/oidc-client-ts) for the authorization code flow with **PKCE (S256)**:

- **Sign in** and **Open your account** redirect to Keycloak; the second adds `prompt=create` to land on the sign-up form.
- `/callback` exchanges the code and the `code_verifier` for tokens, then returns to the page the person wanted.
- Tokens live in `sessionStorage` and renew silently with the refresh token.
- Roles come from `realm_access.roles` in the access token.
- Keycloak receives `ui_locales` with the current language, so its pages match the shell.

## Language

English and Brazilian Portuguese. The first visit follows the browser's preferred languages (any `pt` variant picks Portuguese, anything else English); the switch in the top bar overrides it and is remembered in `localStorage` under `eventbank.locale`.

## Routes

| Route            | Remote                                                                 | Who                                |
| ---------------- | ---------------------------------------------------------------------- | ---------------------------------- |
| `/`              | the shell's landing page, or a redirect by role and application status | everyone                           |
| `/onboarding/*`  | `onboarding/App`                                                       | customers                          |
| `/accounts/*`    | `accounts/App`                                                         | customers, and operators read-only |
| `/pix/*`         | `transfers/App`                                                        | customers                          |
| `/cards/*`       | `cards/App`                                                            | customers                          |
| `/backoffice/*`  | `backoffice/App`                                                       | operators                          |
| `/projections/*` | `operations/App`                                                       | operators                          |

A customer whose application is not approved yet only sees _Your application_; the menu changes on its own once it is.

## The contract with remotes

Remotes are [Module Federation](https://module-federation.io) modules found at runtime in `/config.json` (written from environment variables when the container starts), so they deploy without rebuilding the shell. `react`, `react-dom`, `react-router` and `@tanstack/react-query` are shared singletons, and each remote sits behind an error boundary.

- Expose `./App` as a default-exported component. It receives `auth = { user: { id, name, email, roles }, getAccessToken() }` and `locale` (`'en'` or `'pt-BR'`), and renders text, dates and amounts in that language.
- Call the API with relative `/api/...` URLs and `Authorization: Bearer ${await getAccessToken()}`; the shell's origin proxies them to the gateway.
- Style with the shell's theme in [`public/theme.css`](public/theme.css) and keep screen-specific CSS in the remote.

## Running

```bash
pnpm install
pnpm dev          # http://localhost:5173, API proxied to the gateway on :5100
```

`public/config.json` points at Keycloak on :8180 and at the remotes on ports 5174 to 5179. To run everything at once, use [eventbank-platform](https://github.com/marcelo-roman/eventbank-platform).

## License

[MIT](LICENSE)
