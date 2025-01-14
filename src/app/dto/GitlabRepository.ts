class GitlabRepository implements CommonRepository {
  getJsonString(): string {
    return JSON.stringify(this);
  }
}