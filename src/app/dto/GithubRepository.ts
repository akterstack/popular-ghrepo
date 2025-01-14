class GithubRepository implements CommonRepository {
  getJsonString(): string {
    return JSON.stringify(this);
  }
}