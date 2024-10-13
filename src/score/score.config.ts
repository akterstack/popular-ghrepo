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
    /**
     * forkWeight should be greater than starWeight since most of the github repositories has less forks compare to stars
     */
    forkWeight: 8,

    /**
     * recencyDeviationWeight is inversely proportional to popularity score.
     * For example: which repository is last updated today should be more popular than which is updated a few days ago.
     */
    recencyDeviationWeight: 2,

    /**
     * lifespanDeviationWeight is also inversely proportional to popularity score.
     * For example: which repository gets 5 stars and 5 forks should be more popular
     * which one gets same amount of stars and forks but within more time window / lifespan.
     */
    lifespanDeviationWeight: 1,
  },
});
