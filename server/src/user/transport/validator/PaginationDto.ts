import { IsPositive } from 'class-validator';

export class PaginationDto {
  @IsPositive()
  skip: number;

  @IsPositive()
  take: number;
}
