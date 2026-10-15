import { loadRemote, registerRemotes } from '@module-federation/runtime';
import { type ComponentType } from 'react';
import { type RemoteProps } from './auth/session';
import { loadConfig } from './config';

interface RemoteModule {
  default: ComponentType<RemoteProps>;
}

let registration: Promise<void> | undefined;

async function registerFromConfig(): Promise<void> {
  const config = await loadConfig();
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
