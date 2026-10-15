export interface ShellConfig {
  authority: string;
  clientId: string;
  remotes: Record<string, string>;
}

let config: Promise<ShellConfig> | undefined;

async function fetchConfig(): Promise<ShellConfig> {
  const response = await fetch('/config.json', { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`The shell configuration answered ${response.status}.`);
  }
  return (await response.json()) as ShellConfig;
}

export function loadConfig(): Promise<ShellConfig> {
  config ??= fetchConfig().catch((error: unknown) => {
    config = undefined;
    throw error;
  });
  return config;
}
