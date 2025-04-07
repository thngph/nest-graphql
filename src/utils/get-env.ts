export type EnvKey = 'DATABASE_URL' | 'JWT_SECRET';

export const getEnv = <T>(
  key: EnvKey,
  fallback?: T,
  validate?: (value: unknown) => value is T,
): T => {
  const value = process.env[key] ?? fallback;

  if (value === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  if (validate && !validate(value)) {
    throw new Error(`Environment variable ${key} is not of the expected type`);
  }

  return value as T;
};
