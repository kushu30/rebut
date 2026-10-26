import type { HealthResponse } from '@rebut/core';
import { Router } from 'express';

export const healthRouter: Router = Router();

healthRouter.get('/health', (_request, response) => {
  const body: HealthResponse = { status: 'ok' };
  response.status(200).json(body);
});
