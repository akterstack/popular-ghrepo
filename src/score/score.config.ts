import { z } from 'zod';

export const ScoreConfigSchema = z.object({
  starWeight: z.number().min(0, "Invalid ScoreConfig: 'starWeight' must be a positive number."),
  forkWeight: z.number().min(0, "Invalid ScoreConfig: 'forkWeight' must be a positive number."),
  recencyDeviationWeight: z
    .number()
    .min(1, "Invalid ScoreConfig: 'lifespanDeviationWeight' must be greater than 0."),
  lifespanDeviationWeight: z
    .number()
    .min(1, "Invalid ScoreConfig: 'lifespanDeviationWeight' must be greater than 0."),
});

export type ScoreConfig = z.infer<typeof ScoreConfigSchema>;

export default (): { scoreConfig: ScoreConfig } => ({
  scoreConfig: {
    starWeight: 1,
    forkWeight: 8,
    recencyDeviationWeight: 2,
    lifespanDeviationWeight: 1,
  },
});
