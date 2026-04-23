import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  specialty: string;

  @IsString()
  @IsNotEmpty()
  currentLocation: string;

  @IsDateString()
  availabilityDate: string;
}
