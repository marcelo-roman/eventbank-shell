import { loadRemote, registerRemotes } from '@module-federation/runtime';
import { type ComponentType } from 'react';

interface RuntimeConfig {
  remotes: Record<string, string>;
}

interface RemoteModule {
  default: ComponentType;
}

let registration: Promise<void> | undefined;

async function registerFromConfig(): Promise<void> {
  const response = await fetch('/config.json', { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`The shell configuration answered ${response.status}.`);
  }
  const config = (await response.json()) as RuntimeConfig;
  registerRemotes(Object.entries(config.remotes).map(([name, entry]) => ({ name, entry, type: 'module' })));
}

function ensureRegistered(): Promise<void> {
  registration ??= registerFromConfig().catch((error: unknown) => {
    registration = undefined;
    throw error;
  });
  return registration;
}

export async function loadRemoteApp(name: string): Promise<RemoteModule> {
  await ensureRegistered();
  const module = await loadRemote<RemoteModule>(`${name}/App`);
  if (!module) {
    throw new Error(`The ${name} module did not expose an App.`);
  }
  return module;
}
