import { IsString, IsNotEmpty, MinLength, MaxLength, Contains } from 'class-validator';

export class CreateAirportDto {
  @IsNotEmpty()
  @IsString()    
  @MinLength(3)
  @MaxLength(3)
  airportCode: string;

  @IsNotEmpty()
  @Contains('Airport')
  airportName: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  // @IsLatLong()
  coordinates: {
    x: number;
    y: number;
  };

  @IsNotEmpty()
  timezone: string;
}
