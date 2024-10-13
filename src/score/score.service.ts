import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ScoreConfig, ScoreConfigSchema } from './score.config';
import { getDaysDiff } from './score.helpers';

@Injectable()
export class ScoreService {
  constructor(private configService: ConfigService) {}

  calculateScore(
    starCount: number,
    forkCount: number,
    createdAt: Date,
    lastUpdatedAt: Date,
  ): number {
    const scoreConfig = this.configService.get<ScoreConfig>('scoreConfig');

    // Validate configuration
    ScoreConfigSchema.parse(scoreConfig);

    /**
     * stars and forks counts create symmetrical scores
     */
    const score = starCount * scoreConfig.starWeight + forkCount * scoreConfig.forkWeight;

    const deviationBasedOnDaysLastUpdated = this.getDeviationBasedOnDaysLastUpdated(
      lastUpdatedAt,
      scoreConfig.recencyDeviationWeight,
    );

    const deviationBasedOnLifespan = this.getDeviationForLifespan(
      createdAt,
      lastUpdatedAt,
      scoreConfig.lifespanDeviationWeight,
    );

    /**
     * Last updated and lifespan of a GitHub repository should be inversely proportional
     * - repository which is updated today should be more popular than which one is updated yesterday
     * - repository which collects 5 stars within 5 days should be more popular which collects 5 stars within 30 days
     */
    return score / (deviationBasedOnDaysLastUpdated * deviationBasedOnLifespan);
  }

  getDeviationBasedOnDaysLastUpdated(lastUpdatedAt: Date, lifespanDeviationWeight: number) {
    const daysAgoLastUpdated = getDaysDiff(lastUpdatedAt, new Date());

    return this.calculateDeviation(lifespanDeviationWeight, daysAgoLastUpdated);
  }

  getDeviationForLifespan(createdAt: Date, lastUpdatedAt: Date, lifespanDeviationWeight: number) {
    const daysBetweenCreatedAndLastUpdated = getDaysDiff(createdAt, lastUpdatedAt);

    return this.calculateDeviation(lifespanDeviationWeight, daysBetweenCreatedAndLastUpdated);
  }

  calculateDeviation(weight: number, daysDiff: number) {
    return weight * (daysDiff || 1);
  }
}
