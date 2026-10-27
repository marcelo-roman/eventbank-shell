import { type User, UserManager, WebStorageStateStore } from 'oidc-client-ts';
import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { loadConfig } from '../config';
import { useLocale } from '../i18n/LocaleContext';
import { type Auth, AuthContext } from './AuthContext';
import { sessionUserFrom } from './session';

interface SignInState {
  returnTo: string;
}

async function createManager(): Promise<UserManager> {
  const config = await loadConfig();
  return new UserManager({
    authority: config.authority,
    client_id: config.clientId,
    redirect_uri: `${window.location.origin}/callback`,
    post_logout_redirect_uri: `${window.location.origin}/`,
    response_type: 'code',
    scope: 'openid profile email',
    automaticSilentRenew: true,
    userStore: new WebStorageStateStore({ store: window.sessionStorage }),
  });
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const managerRef = useRef<Promise<UserManager> | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const { locale } = useLocale();

  const manager = useCallback(() => {
    managerRef.current ??= createManager().then((created) => {
      created.events.addUserLoaded(setUser);
      created.events.addUserUnloaded(() => {
        setUser(null);
      });
      return created;
    });
    return managerRef.current;
  }, []);

  useEffect(() => {
    void manager()
      .then((created) => created.getUser())
      .then((existing) => {
        setUser(existing && !existing.expired ? existing : null);
        setReady(true);
      });
  }, [manager]);

  const auth = useMemo<Auth>(
    () => ({
      ready,
      signingOut,
      user: user ? sessionUserFrom(user.access_token) : null,
      signIn: async (returnTo = window.location.pathname) => {
        await (
          await manager()
        ).signinRedirect({
          state: { returnTo } satisfies SignInState,
          extraQueryParams: { ui_locales: locale },
        });
      },
      signUp: async () => {
        await (
          await manager()
        ).signinRedirect({
          prompt: 'create',
          state: { returnTo: '/' } satisfies SignInState,
          extraQueryParams: { ui_locales: locale },
        });
      },
      signOut: async () => {
        setSigningOut(true);
        await (await manager()).signoutRedirect({ extraQueryParams: { ui_locales: locale } });
      },
      completeSignIn: async () => {
        const signedIn = await (await manager()).signinRedirectCallback();
        setUser(signedIn);
        return (signedIn.state as SignInState | undefined)?.returnTo ?? '/';
      },
      getAccessToken: async () => {
        const created = await manager();
        const current = await created.getUser();
        if (current && !current.expired) {
          return current.access_token;
        }
        const renewed = await created.signinSilent();
        if (!renewed) {
          throw new Error('Your session ended. Sign in again.');
        }
        return renewed.access_token;
      },
    }),
    [locale, manager, ready, signingOut, user],
  );

  return <AuthContext value={auth}>{children}</AuthContext>;
}
