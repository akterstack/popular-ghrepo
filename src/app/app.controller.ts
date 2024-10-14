import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { SearchParams } from '../github/search.params';

@Controller('/v1/repositories')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @UsePipes(ZodValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  async getRepositoryWithPopularityScore(@Query() searchParams: SearchParams) {
    if (Object.keys(searchParams).length === 0) {
      throw new HttpException('At least one param is required.', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.appService.getRepositoriesWithPopularityScore(searchParams);
    } catch (error) {
      console.error(error);
      // TODO: send proper status for validation error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
