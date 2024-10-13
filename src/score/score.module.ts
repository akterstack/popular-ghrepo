import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './score.config';
import { ScoreService } from './score.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [ScoreService],
  exports: [ScoreService],
})
export class ScoreModule {}
