import { IsString, IsOptional } from 'class-validator';

export class SearchProductsDto {
  @IsString()
  @IsOptional()
  q: string = '';
}
