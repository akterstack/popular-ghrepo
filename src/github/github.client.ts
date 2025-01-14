import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GithubClient {
  protected readonly baseUrl: string;

  constructor(configService: ConfigService, baseUrlProp: string) {
    this.baseUrl = configService.get<string>(baseUrlProp);
  }

  searchRepositories(queryString: string) {
    const searchUrl = `${this.baseUrl}/search/repositories?${queryString}`;

    return fetch(searchUrl);
  }
}
