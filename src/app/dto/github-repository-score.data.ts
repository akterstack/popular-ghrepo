import { GithubRepositoryData } from './github-repository.data';

export class GithubRepositoryScoreData {
  constructor(
    readonly repository: GithubRepositoryData,
    readonly popularityScore: number,
  ) {}
}
