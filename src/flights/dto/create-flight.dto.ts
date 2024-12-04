export class CreateFlightDto {
  flightId: number;
  flightNo: string;
  scheduledDeparture: string;
  scheduledArrival: string;
  departureAirport: string;
  arrivalAirport: string;
  status: string;
  aircraftCode: string;
  actualDeparture: string;
  actualArrival: string;
}
