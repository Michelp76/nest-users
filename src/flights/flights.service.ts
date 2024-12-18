import { Inject, Injectable } from '@nestjs/common';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { airportsData, flights } from 'src/drizzle/schema';
import { eq, and, sql } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';

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

  async findByCriteria(
    departureCity: string,
    arrivalCity: string,
    departureDate?: string,
    arrivalDate?: string,
  ) {
    const airportsAlias = alias(airportsData, 'airportsAlias');

    return await this.db
      .select({
        flightId: flights.flightId,
        flightNo: flights.flightNo,
        scheduledDeparture: flights.scheduledDeparture,
        scheduledArrival: flights.scheduledArrival,
        departureAirport: flights.departureAirport,
        arrivalAiport: flights.arrivalAirport,
        status: flights.status,
        aircraftCode: flights.aircraftCode,
        actualDeparture: flights.actualDeparture,
        actualArrivall: flights.actualArrival,
      })
      .from(flights)
      .innerJoin(
        airportsData,
        eq(flights.departureAirport, airportsData.airportCode),
      )
      .innerJoin(
        airportsAlias,
        eq(flights.arrivalAirport, airportsAlias.airportCode),
      )
      .where(
        and(
          eq(flights.status, 'Scheduled'),
          sql`${airportsData.city}->'en' @> ${JSON.stringify(departureCity)}`,
          sql`${airportsAlias.city}->'en' @> ${JSON.stringify(arrivalCity)}`,
          departureDate
            ? sql`${flights.scheduledDeparture}::date = ${JSON.stringify(departureDate)}`
            : undefined,
          arrivalDate
            ? sql`${flights.scheduledArrival}::date = ${JSON.stringify(arrivalDate)}`
            : undefined,
        ),
      );
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
