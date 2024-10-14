import { Injectable } from '@nestjs/common';
import { SearchParams } from './search.params';
import { GithubClient } from './github.client';

@Injectable()
export class GithubService {
  constructor(private readonly githubClient: GithubClient) {}

  async searchRepositories(searchParams: SearchParams) {
    let response: Response;

    try {
      const searchQuery = `q=${this.convertSearchParamsToQueryString(searchParams)}`;

      response = await this.githubClient.searchRepositories(searchQuery);
    } catch (error) {
      console.error(error);
      throw new Error('Unexpected error while calling GitHub API.');
    }

    const jsonData = await response.json();
    if (!response.ok) {
      console.error(`Error while calling Github endpoint: ${response.url}. \nResponse:`, jsonData);
      throw new Error(`GithubError: ${jsonData.message}`);
    }
    return jsonData.items;
  }

  convertSearchParamsToQueryString(searchParams: SearchParams) {
    const queryParts = [];

    if (searchParams.query?.length) {
      queryParts.push(encodeURIComponent(searchParams.query));
    }

    const qualifierString = this.convertSearchQualifierToQueryString(searchParams);
    if (qualifierString.length) {
      queryParts.push(qualifierString);
    }

    return queryParts.join('+');
  }

  convertSearchQualifierToQueryString(searchParams: SearchParams) {
    const queryParts = [];

    if (searchParams.language?.length) {
      queryParts.push(`language:${encodeURIComponent(searchParams.language)}`);
    }

    if (searchParams.created?.length) {
      queryParts.push(`created:>${encodeURIComponent(searchParams.created)}`);
    }
    return queryParts.join('+');
  }
}
