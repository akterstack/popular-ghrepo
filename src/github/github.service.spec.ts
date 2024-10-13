import { GithubService } from './github.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { GithubClient } from './github.client';

describe('GithubService', () => {
  let githubService: GithubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [GithubClient, GithubService],
    }).compile();

    githubService = module.get(GithubService);
  });

  describe('convertSearchQualifierToQueryString()', () => {
    it("should join qualifiers with '+' and exclude 'query'", () => {
      const created = '2020-05-01T00:00:00.000Z';
      const language = 'typescript';
      const query = 'query-text';

      const actual = githubService.convertSearchQualifierToQueryString({
        created,
        language,
        query,
      });

      expect(actual).toEqual(`language:${language}+created:>${encodeURIComponent(created)}`);
    });
  });

  describe('convertSearchParamsToQueryString()', () => {
    it("should join qualifiers with '+' and exclude 'query'", () => {
      const created = '2020-05-01T00:00:00.000Z';
      const language = 'typescript';
      const query = 'query-text';

      let actual = githubService.convertSearchParamsToQueryString({
        created,
        language,
        query,
      });

      expect(actual).toEqual(
        `${encodeURIComponent(query)}+language:${language}+created:>${encodeURIComponent(created)}`,
      );

      actual = githubService.convertSearchParamsToQueryString({
        created,
        language,
        query: '',
      });

      expect(actual).toEqual(`language:${language}+created:>${encodeURIComponent(created)}`);
    });
  });
});
