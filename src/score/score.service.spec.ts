import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ScoreService } from './score.service';
import configuration from './score.config';

describe('ScoreService', () => {
  let scoreService: ScoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
      ],
      providers: [ConfigService, ScoreService],
    }).compile();

    scoreService = module.get(ScoreService);
  });

  describe('calculateDeviation()', () => {
    const weight = 5;

    it('should return value equals to weight when daysDiff is 0', () => {
      const value = scoreService.calculateDeviation(weight, 0);

      expect(value).toBe(weight);
    });

    it('should return value of weight multiplied by daysDiff', () => {
      const daysDiff = 2;
      expect(scoreService.calculateDeviation(weight, daysDiff)).toBe(daysDiff * weight);
    });
  });

  describe('calculateScore()', () => {
    it('should score be zero when stars and forks count both are zero', () => {
      expect(
        scoreService.calculateScore(0, 0, new Date('2024-01-01'), new Date('2024-01-31')),
      ).toBe(0);
    });

    it("shouldn't score be zero when stars or forks count is greater than zero", () => {
      expect(
        scoreService.calculateScore(1, 0, new Date('2024-01-01'), new Date('2024-01-31')),
      ).toBeGreaterThan(0);
      expect(
        scoreService.calculateScore(0, 1, new Date('2024-01-01'), new Date('2024-01-31')),
      ).toBeGreaterThan(0);
      expect(
        scoreService.calculateScore(2, 30, new Date('2024-01-01'), new Date('2024-01-31')),
      ).toBeGreaterThan(0);
    });

    const starsCount = 100;
    const forksCount = 10;
    const createdAt = new Date();
    const updatedAt = new Date();

    it('should increase score when stars and/or forks count increases', () => {
      const baseScore = scoreService.calculateScore(starsCount, forksCount, createdAt, updatedAt);
      expect(
        scoreService.calculateScore(starsCount + 10, forksCount, createdAt, updatedAt),
      ).toBeGreaterThan(baseScore);
      expect(
        scoreService.calculateScore(starsCount, forksCount + 20, createdAt, updatedAt),
      ).toBeGreaterThan(baseScore);
      expect(
        scoreService.calculateScore(starsCount + 10, forksCount + 20, createdAt, updatedAt),
      ).toBeGreaterThan(baseScore);
    });

    it('should decrease score when stars and/or forks count decreases', () => {
      const baseScore = scoreService.calculateScore(starsCount, forksCount, createdAt, updatedAt);
      expect(
        scoreService.calculateScore(starsCount - 10, forksCount, createdAt, updatedAt),
      ).toBeLessThan(baseScore);
      expect(
        scoreService.calculateScore(starsCount, forksCount - 20, createdAt, updatedAt),
      ).toBeLessThan(baseScore);
      expect(
        scoreService.calculateScore(starsCount - 10, forksCount - 20, createdAt, updatedAt),
      ).toBeLessThan(baseScore);
    });

    it('should increase score when last updated date increase (proportional)', () => {
      const createdAt = new Date('2024-01-01');
      const updatedAt = new Date('2024-01-31');
      const baseScore = scoreService.calculateScore(starsCount, forksCount, createdAt, updatedAt);

      const daysDiff = 10;
      const newerCreatedAt = new Date(createdAt);
      newerCreatedAt.setDate(newerCreatedAt.getDate() + daysDiff);
      const newerUpdatedAt = new Date(updatedAt);
      newerUpdatedAt.setDate(newerUpdatedAt.getDate() + daysDiff);
      expect(
        scoreService.calculateScore(starsCount, forksCount, newerCreatedAt, newerUpdatedAt),
      ).toBeGreaterThan(baseScore);
    });

    it('should decrease score when last updated date decrease (proportional)', () => {
      const createdAt = new Date('2024-01-01');
      const updatedAt = new Date('2024-01-31');
      const baseScore = scoreService.calculateScore(starsCount, forksCount, createdAt, updatedAt);

      const daysDiff = 10;
      const olderCreatedAt = new Date(createdAt);
      olderCreatedAt.setDate(olderCreatedAt.getDate() - daysDiff);
      const olderUpdatedAt = new Date(updatedAt);
      olderUpdatedAt.setDate(olderUpdatedAt.getDate() - daysDiff);
      expect(
        scoreService.calculateScore(starsCount, forksCount, olderCreatedAt, olderUpdatedAt),
      ).toBeLessThan(baseScore);
    });

    it('should increase score when lifespan of the repo decreases (inversely proportional)', () => {
      const createdAt = new Date('2024-01-01');
      const updatedAt = new Date('2024-01-31');
      const baseScore = scoreService.calculateScore(starsCount, forksCount, createdAt, updatedAt);

      const daysDiff = 10;
      const newerCreatedAt = new Date(createdAt);
      newerCreatedAt.setDate(newerCreatedAt.getDate() + daysDiff);
      expect(
        scoreService.calculateScore(starsCount, forksCount, newerCreatedAt, updatedAt),
      ).toBeGreaterThan(baseScore);
    });

    it('should decrease score when lifespan of the repo increase (inversely proportional)', () => {
      const createdAt = new Date('2024-01-01');
      const updatedAt = new Date('2024-01-31');
      const baseScore = scoreService.calculateScore(starsCount, forksCount, createdAt, updatedAt);

      const daysDiff = 10;
      const newerCreatedAt = new Date(createdAt);
      newerCreatedAt.setDate(newerCreatedAt.getDate() - daysDiff);
      expect(
        scoreService.calculateScore(starsCount, forksCount, newerCreatedAt, updatedAt),
      ).toBeLessThan(baseScore);
    });
  });
});
