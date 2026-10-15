import { type ComponentType, lazy, Suspense } from 'react';
import { type RemoteProps } from './auth/session';
import { loadRemoteApp } from './remotes';
import { RemoteBoundary } from './RemoteBoundary';

export function remoteApp(name: string, label: string): ComponentType<RemoteProps> {
  const Remote = lazy(() => loadRemoteApp(name));

  function RemoteApp(props: RemoteProps) {
    return (
      <RemoteBoundary label={label}>
        <Suspense fallback={<p className="page muted">Loading {label.toLowerCase()}…</p>}>
          <Remote {...props} />
        </Suspense>
      </RemoteBoundary>
    );
  }

  RemoteApp.displayName = `Remote(${name})`;
  return RemoteApp;
}
