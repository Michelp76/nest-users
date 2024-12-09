import { IsDate, IsDateString, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateFlightDto {
  @IsNotEmpty()
  flightId: number;

  @IsNotEmpty()
  flightNo: string;

  @IsNotEmpty()
  @IsDateString()
  scheduledDeparture: string;

  @IsNotEmpty()
  @IsDateString()    
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

  // @IsDateString()  
  actualDeparture: string;

  // @IsDateString()  
  actualArrival: string;
}
