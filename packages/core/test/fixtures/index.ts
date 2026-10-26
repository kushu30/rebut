import { z } from 'zod';
import { caseSchema } from '../../src/domain/case.js';
import { evidenceFactSchema } from '../../src/domain/evidence.js';
import { recommendationSchema } from '../../src/domain/recommendation.js';
import scenario1 from './scenario-1.json' with { type: 'json' };
import scenario2 from './scenario-2.json' with { type: 'json' };
import scenario3 from './scenario-3.json' with { type: 'json' };
import scenario4 from './scenario-4.json' with { type: 'json' };
import scenario5 from './scenario-5.json' with { type: 'json' };
import scenario6 from './scenario-6.json' with { type: 'json' };

export const scenarioSchema = z.object({
  case: caseSchema,
  facts: z.array(evidenceFactSchema),
  recommendation: recommendationSchema,
});
export type Scenario = z.infer<typeof scenarioSchema>;

export const scenarios: Scenario[] = [
  scenario1,
  scenario2,
  scenario3,
  scenario4,
  scenario5,
  scenario6,
].map((raw) => scenarioSchema.parse(raw));
