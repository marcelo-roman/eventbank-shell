export type Role = 'customer' | 'operator';

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  roles: Role[];
}

export interface RemoteAuth {
  user: SessionUser;
  getAccessToken: () => Promise<string>;
}

export interface RemoteProps {
  auth: RemoteAuth;
}

interface AccessTokenClaims {
  sub: string;
  name?: string;
  preferred_username?: string;
  email?: string;
  realm_access?: { roles?: string[] };
}

const knownRoles: Role[] = ['customer', 'operator'];

export function sessionUserFrom(accessToken: string): SessionUser {
  const payload = accessToken.split('.')[1] ?? '';
  const json = atob(payload.replaceAll('-', '+').replaceAll('_', '/'));
  const claims = JSON.parse(
    new TextDecoder().decode(Uint8Array.from(json, (character) => character.charCodeAt(0))),
  ) as AccessTokenClaims;
  const roles = (claims.realm_access?.roles ?? []).filter((role): role is Role => knownRoles.includes(role as Role));
  return {
    id: claims.sub,
    name: claims.name ?? claims.preferred_username ?? '',
    email: claims.email ?? '',
    roles,
  };
}
