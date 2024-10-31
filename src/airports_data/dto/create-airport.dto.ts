export class CreateAirportDto {
  airportCode: string;
  airportName: string;
  city: string;
  coordinates: {
    x: number;
    y: number;
  };
  timezone: string;
}
