import { IsNotEmpty, IsString } from 'class-validator';

export class CreateIndustryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
