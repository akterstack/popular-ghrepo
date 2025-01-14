class Result<T extends CommonRepository> {
  status: number;
  data: T;
  errors: [];

  constructor(data: T) {
  }
}
