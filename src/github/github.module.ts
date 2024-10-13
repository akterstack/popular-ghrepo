import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GithubClient } from './github.client';
import { GithubService } from './github.service';

@Module({
  imports: [ConfigModule],
  providers: [GithubClient, GithubService],
  exports: [GithubService],
})
export class GithubModule {}
