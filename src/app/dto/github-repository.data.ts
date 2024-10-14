import { Exclude, Expose } from 'class-transformer';

export class GithubRepositoryData {
  @Exclude()
  readonly rawData: Record<string, unknown>;

  constructor(rawData: Record<string, unknown>) {
    if (!rawData) {
      throw new Error('Raw source data cannot be null or undefined.');
    }
    this.rawData = rawData;
  }

  @Expose()
  get id() {
    return this.rawData.id;
  }

  @Expose()
  get name() {
    return this.rawData.name;
  }

  @Expose()
  get fullName() {
    return this.rawData.full_name;
  }

  @Expose()
  get url() {
    return this.rawData.html_url;
  }

  @Expose()
  get description() {
    return this.rawData.description;
  }

  @Expose()
  get starsCount() {
    return this.rawData.stargazers_count as number;
  }

  @Expose()
  get forksCount() {
    return this.rawData.forks_count as number;
  }

  @Expose()
  get createdAt() {
    return new Date(this.rawData.created_at as string);
  }

  @Expose()
  get updatedAt() {
    return new Date(this.rawData.created_at as string);
  }
}
