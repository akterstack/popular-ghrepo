import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppService } from '../src/app/app.service';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app/app.module';
import { GithubRepositoryScoreData } from '../src/app/dto/github-repository-score.data';
import { SearchParams } from '../src/github/search.params';

describe('App', () => {
  let app: INestApplication;

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

  const appService = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getRepositoriesWithPopularityScore(_: SearchParams): Promise<any> {
      return [JSON.stringify(repoScoreData)];
    },
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
      providers: [AppService],
    })
      .overrideProvider(AppService)
      .useValue(appService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('/GET repositories', () => {
    return request(app.getHttpServer())
      .get('/v1/repositories?language=typescript')
      .expect(200)
      .expect([JSON.stringify(repoScoreData)]);
  });

  afterAll(async () => {
    await app.close();
  });
});
