import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTravelPlanDto {
  @IsString()
  @IsNotEmpty()
  countryCode: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  startDate: string;

  @IsString()
  @IsNotEmpty()
  endDate: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

