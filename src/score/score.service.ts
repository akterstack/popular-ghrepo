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

    const score = starCount * scoreConfig.starWeight + forkCount * scoreConfig.forkWeight;

    const deviationBasedOnRecency = this.getDeviationBasedOnRecency(
      lastUpdatedAt,
      scoreConfig.recencyDeviationWeight,
    );

    const deviationBasedOnLifespan = this.getDeviationForLifespan(
      createdAt,
      lastUpdatedAt,
      scoreConfig.lifespanDeviationWeight,
    );

    return score / (deviationBasedOnRecency * deviationBasedOnLifespan);
  }

  getDeviationBasedOnRecency(lastUpdatedAt: Date, lifespanDeviationWeight: number) {
    const daysBetweenCreatedAndLastUpdated = getDaysDiff(lastUpdatedAt, new Date());

    return this.calculateDeviation(lifespanDeviationWeight, daysBetweenCreatedAndLastUpdated);
  }

  getDeviationForLifespan(createdAt: Date, lastUpdatedAt: Date, lifespanDeviationWeight: number) {
    const daysBetweenCreatedAndLastUpdated = getDaysDiff(createdAt, lastUpdatedAt);

    return this.calculateDeviation(lifespanDeviationWeight, daysBetweenCreatedAndLastUpdated);
  }

  calculateDeviation(weight: number, daysDiff: number) {
    return weight * (daysDiff || 1);
  }
}
