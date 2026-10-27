import { type ComponentType, lazy, Suspense } from 'react';
import { type RemoteProps } from './auth/session';
import { useLocale } from './i18n/LocaleContext';
import { type Messages } from './i18n/messages';
import { loadRemoteApp } from './remotes';
import { RemoteBoundary } from './RemoteBoundary';

type RemoteName = keyof Messages['remotes'];

export function remoteApp(name: RemoteName): ComponentType<RemoteProps> {
  const Remote = lazy(() => loadRemoteApp(name));

  function RemoteApp(props: RemoteProps) {
    const { t } = useLocale();
    const label = t.remotes[name];
    return (
      <RemoteBoundary unavailable={t.remoteUnavailable(label)}>
        <Suspense fallback={<p className="page muted">{t.loadingRemote(label)}</p>}>
          <Remote {...props} />
        </Suspense>
      </RemoteBoundary>
    );
  }

  RemoteApp.displayName = `Remote(${name})`;
  return RemoteApp;
}
