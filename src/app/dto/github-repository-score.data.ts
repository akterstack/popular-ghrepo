import { GithubRepositoryData } from './github-repository.data';

/**
 * DTO class to respond with popularity score and GitHub repository info
 */
export class GithubRepositoryScoreData {
  constructor(
    readonly repository: GithubRepositoryData,
    readonly popularityScore: number,
  ) {}
}
