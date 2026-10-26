import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  {
    test: {
      name: 'unit',
      environment: 'node',
      include: ['{packages,apps}/*/test/**/*.test.ts'],
      exclude: ['**/test/sandbox/**', '**/node_modules/**'],
    },
  },
  {
    test: {
      name: 'web',
      environment: 'jsdom',
      include: ['apps/web/test/**/*.test.tsx'],
    },
  },
]);
