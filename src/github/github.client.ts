import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GithubClient {
  private readonly baseUrl: string;

  constructor(private configService: ConfigService) {
    this.baseUrl = configService.get<string>('GITHUB_API_BASE_URL');
  }

  searchRepositories(queryString: string) {
    const searchUrl = `${this.baseUrl}/search/repositories?${queryString}`;

    console.log(`Search url: ${searchUrl}`);

    return fetch(searchUrl);
  }
}
