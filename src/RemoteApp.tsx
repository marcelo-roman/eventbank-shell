import { type ComponentType, lazy, Suspense } from 'react';
import { loadRemoteApp } from './remotes';
import { RemoteBoundary } from './RemoteBoundary';

export function remoteApp(name: string, label: string): ComponentType {
  const Remote = lazy(() => loadRemoteApp(name));

  function RemoteApp() {
    return (
      <RemoteBoundary label={label}>
        <Suspense fallback={<p className="page muted">Loading {label.toLowerCase()}…</p>}>
          <Remote />
        </Suspense>
      </RemoteBoundary>
    );
  }

  RemoteApp.displayName = `Remote(${name})`;
  return RemoteApp;
}
