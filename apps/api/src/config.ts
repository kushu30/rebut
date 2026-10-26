export function loadConfig(env: NodeJS.ProcessEnv = process.env) {
  return { port: Number(env.PORT ?? 3000) };
}
