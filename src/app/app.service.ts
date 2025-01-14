import { Injectable } from '@nestjs/common';
import { SearchParams } from '../github/search.params';
import { GithubService } from '../github/github.service';
import { GithubRepositoryScoreData } from './dto/github-repository-score.data';
import { ScoreService } from '../score/score.service';
import { GithubRepositoryData } from './dto/github-repository.data';

@Injectable()
export class AppService {
  constructor(
    private readonly githubService: GithubService,
    private readonly scoreService: ScoreService,
  ) {}

  async getRepositoriesWithPopularityScore(searchParams: SearchParams) {
    // rawRepositories contains raw response from GitHub API


    let service = searchParams.source === 'github' ? githubService : gitlabService;

    const [githubResult, gitlabResult] = Promise.all([service.searchRepositories(searchParams), service.searchRepositories(searchParams)]);

    return rawRepositories.map(this.calcScoreAndBuildRepositoryData.bind(this));
  }

  private calcScoreAndBuildRepositoryData(rawRepository: Record<string, unknown>) {
    const repository = new GithubRepositoryData(rawRepository);

    const score = this.scoreService.calculateScore(
      repository.starsCount,
      repository.forksCount,
      repository.createdAt,
      repository.updatedAt,
    );

    return new GithubRepositoryScoreData(repository, score);
  }
}
