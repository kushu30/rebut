import { describe, expect, it } from 'vitest';
import {
  approveRequestSchema,
  caseDetailResponseSchema,
  caseSchema,
  defaultPolicy,
  policySchema,
  recommendationSchema,
} from '../src/index.js';
import { scenarios } from './fixtures/index.js';

describe('demo scenario fixtures', () => {
  it('covers the six seeded scenarios in order', () => {
    expect(scenarios.map((s) => s.recommendation.action)).toEqual([
      'FIGHT',
      'ACCEPT',
      'OFFER_REFUND',
      'OFFER_REFUND',
      'FIGHT',
      'FIGHT',
    ]);
  });

  it('cites only facts that exist in the same scenario', () => {
    for (const scenario of scenarios) {
      const factIds = new Set(scenario.facts.map((f) => f.id));
      for (const reason of scenario.recommendation.reasons) {
        for (const id of reason.factIds) expect(factIds.has(id)).toBe(true);
      }
    }
  });

  it('attaches each recommendation to its own case', () => {
    for (const scenario of scenarios) {
      expect(scenario.recommendation.caseId).toBe(scenario.case.id);
    }
  });
});

describe('domain schemas', () => {
  it('rejects a dispute reason PayPal does not define', () => {
    const [first] = scenarios;
    const result = caseSchema.safeParse({ ...first?.case, reason: 'BUYER_REMORSE' });
    expect(result.success).toBe(false);
  });

  it('strips a numeric confidence from a recommendation', () => {
    const [first] = scenarios;
    const parsed = recommendationSchema.parse({ ...first?.recommendation, confidence: 0.9 });
    expect('confidence' in parsed).toBe(false);
  });

  it('fills the seller policy defaults from an empty object', () => {
    expect(policySchema.parse({})).toEqual(defaultPolicy);
    expect(defaultPolicy).toMatchObject({
      autoFightEnabled: false,
      autoAcceptEnabled: false,
      killSwitch: false,
      alertHoursBeforeDeadline: 24,
    });
  });
});

describe('api schemas', () => {
  it('accepts an approve request without a draft', () => {
    expect(approveRequestSchema.parse({})).toEqual({});
  });

  it('parses a case detail built from a fixture', () => {
    const [first] = scenarios;
    const detail = {
      case: first?.case,
      facts: first?.facts,
      recommendation: first?.recommendation,
      draft: null,
      events: [],
    };
    expect(caseDetailResponseSchema.parse(detail).case.id).toBe(first?.case.id);
  });
});
