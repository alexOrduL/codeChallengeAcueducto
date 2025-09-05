import { IsString, IsOptional, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class SearchProductsDto {
  @IsString({ message: 'El término de búsqueda debe ser una cadena de texto' })
  @IsOptional()
  @MinLength(0, { message: 'El término de búsqueda no puede estar vacío si se proporciona' })
  @MaxLength(100, { message: 'El término de búsqueda no puede exceder 100 caracteres' })
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : '')
  // @Sanitize(['trim', 'escape']) // Temporalmente deshabilitado
  q: string = '';
}
