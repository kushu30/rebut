import { healthResponseSchema } from '@rebut/core';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../../src/app.js';

describe('GET /health', () => {
  it('answers 200 with the health contract', async () => {
    const response = await request(createApp()).get('/health');
    expect(response.status).toBe(200);
    expect(healthResponseSchema.parse(response.body)).toEqual({ status: 'ok' });
  });

  it('answers 404 for an unknown route', async () => {
    const response = await request(createApp()).get('/nope');
    expect(response.status).toBe(404);
  });
});
