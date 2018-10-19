import { Transform } from 'class-transformer';
import { IsOptional, IsPositive, Max } from 'class-validator';

/**
 * Describes request for pagination
 *
 * Converts strings to integers before validation.
 */
export class PaginationDto {
  /**
   * Pagination offset
   */
  @IsOptional()
  @IsPositive()
  @Transform(val => parseInt(val, 10))
  public skip: number;

  /**
   * Pagination limit
   */
  @IsOptional()
  @IsPositive()
  @Max(50)
  @Transform(val => parseInt(val, 10))
  public take: number;
}
