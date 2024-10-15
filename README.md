# Popular Github Repo

## How to run

```shell
npm install

# run in development mode
npm run start:dev

# check test coverage
npm test && npm run test:e2e && npm run test:cov

# run in production mode
npm build && npm start
```

## Test endpoint

1. Browse http://localhost:3000/api to test api through OpenAPI/Swagger UI or
2. Direct API access http://localhost:3000/v1/repositories?language=typescript&created=2024-03-01

## Improvements

1. Implement authentication and authorization
2. Improve test coverage
3. 