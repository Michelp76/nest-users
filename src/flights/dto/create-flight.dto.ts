import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { IsAfter } from 'src/validator/utils';

export class CreateFlightDto {
  @IsNotEmpty()
  flightId: number;

  @IsNotEmpty()
  flightNo: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date) 
  scheduledDeparture: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date) 
  @IsAfter('scheduledDeparture')
  scheduledArrival: string;

  @IsNotEmpty()
  departureAirport: string;

  @IsNotEmpty()
  arrivalAirport: string;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()  
  @IsString()
  @MinLength(3)
  @MaxLength(3)
  aircraftCode: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date) 
  @IsAfter('scheduledDeparture')
  actualDeparture: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date) 
  @IsAfter('scheduledArrival')
  actualArrival: string;
}
