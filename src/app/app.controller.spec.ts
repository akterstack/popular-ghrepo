import { AppController } from './app.controller';
import { Test } from '@nestjs/testing';
import { AppService } from './app.service';
import { GithubModule } from '../github/github.module';
import { ScoreModule } from '../score/score.module';
import { GithubRepositoryScoreData } from './dto/github-repository-score.data';
import { HttpException } from '@nestjs/common';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [GithubModule, ScoreModule],
      providers: [AppService],
      controllers: [AppController],
    }).compile();

    appController = module.get(AppController);
    appService = module.get(AppService);
  });

  it('should return result', async () => {
    const repoScoreData = new GithubRepositoryScoreData(
      {
        id: 12324243,
        name: 'repo',
        fullName: 'user/repo',
        url: 'https://github.com/user/repo',
        description: 'user description',
        starsCount: 100,
        forksCount: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
        rawData: {},
      },
      20,
    );

    jest.spyOn(appService, 'getRepositoriesWithPopularityScore').mockResolvedValue([repoScoreData]);

    const resp = await appController.getRepositoryWithPopularityScore({});

    expect(resp).toEqual([repoScoreData]);
  });

  it('should return result', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest
      .spyOn(appService, 'getRepositoriesWithPopularityScore')
      .mockRejectedValue(new Error('Test error.'));

    try {
      await appController.getRepositoryWithPopularityScore({});
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toEqual('Test error.');
    }
  });
});
