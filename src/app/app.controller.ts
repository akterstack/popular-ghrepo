import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { SearchParams } from '../github/search.params';
import { ZodValidationPipe } from 'nestjs-zod';

@Controller('/v1/repositories')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UsePipes(ZodValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  async getRepositoryWithPopularityScore(@Query() searchParams: SearchParams) {
    try {
      return await this.appService.getRepositoriesWithPopularityScore(searchParams);
    } catch (error) {
      console.error(error);
      // TODO: send proper status for validation error
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
