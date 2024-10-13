import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

export const SearchParamsSchema = z.object({
  query: z.string().optional(),
  created: z.dateString().format('date').optional(),
  language: z.string().optional(),
});

export class SearchParams extends createZodDto(SearchParamsSchema) {}
