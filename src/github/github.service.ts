import { Injectable } from '@nestjs/common';
import { SearchParams } from './search.params';
import { GithubClient } from './github.client';

@Injectable()
export class GithubService {
  constructor(private readonly githubClient: GithubClient) {}

  async searchRepositories(searchParams: SearchParams) {
    try {
      const searchQuery = `q=${this.convertSearchParamsToQueryString(searchParams)}`;
      console.log('Search query: ' + searchQuery);
      const response = await this.githubClient.searchRepositories(searchQuery);
      const jsonData = await response.json();

      return jsonData.items;
    } catch (error) {
      console.error(error);
      throw error;
    }
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
