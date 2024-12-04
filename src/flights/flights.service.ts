import { Inject, Injectable } from '@nestjs/common';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { flights } from 'src/drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class FlightsService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(createFlightDto: CreateFlightDto) {
    type NewFlightsData = typeof flights.$inferInsert;
    const insertFlightsData = async (flightsData: NewFlightsData) => {
      return this.db.insert(flights).values(flightsData);
    };
    const newFlightsData: NewFlightsData = {
      flightId: createFlightDto.flightId,
      flightNo: createFlightDto.flightNo,
      scheduledDeparture: createFlightDto.scheduledDeparture,
      scheduledArrival: createFlightDto.scheduledArrival,
      departureAirport: createFlightDto.departureAirport,
      arrivalAirport: createFlightDto.arrivalAirport,
      status: createFlightDto.status,
      aircraftCode: createFlightDto.aircraftCode,
      actualDeparture: createFlightDto.actualDeparture,
      actualArrival: createFlightDto.actualArrival,
    };
    await insertFlightsData(newFlightsData);
  }

  async findAll() {
    return await this.db.select().from(flights);
  }

  async findOne(id: number) {
    // Syntaxe "SQL-like"
    return await this.db.select().from(flights).where(eq(flights.flightId, id));
  }

  async update(id: number, updateFlightDto: UpdateFlightDto) {
    return await this.db
      .update(flights)
      .set(updateFlightDto)
      .where(eq(flights.flightId, id));
  }

  async remove(id: number) {
    return await this.db
      .delete(flights)
      .where(eq(flights.flightId, id))
      .returning();
  }
}
