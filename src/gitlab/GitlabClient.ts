import { GithubClient } from "../github/github.client";

class GitlabClient extends GithubClient {
  searchRepositories(queryString: string) {
    const searchUrl = `${this.baseUrl}/repositories?${queryString}`;

    return fetch(searchUrl);
  }
}