export type UserRole = 'Editor';

export interface TestUser {
  email: string;
  password: string;
  role: UserRole;
}

// Unique email per call so parallel runs don't collide.
export function buildEditorUser(): TestUser {
  const suffix = `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
  return {
    email: `editor.${suffix}@example.com`,
    password: 'Editor#Passw0rd',
    role: 'Editor',
  };
}
