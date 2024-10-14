import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SearchParams {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  query?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  language?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Please use date as string.' })
  created?: string;
}
