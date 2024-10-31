import { Inject, Injectable } from '@nestjs/common';
import { CreateAirportDto } from './dto/create-airport.dto';
import { UpdateAirportDto } from './dto/update-airport.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { airportsData, flights } from 'src/drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class AirportsService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(createAirportDto: CreateAirportDto) {
    type NewAirportData = typeof airportsData.$inferInsert;
    const insertAirportData = async (airportData: NewAirportData) => {
      return this.db.insert(airportsData).values(airportData);
    };
    const newAirportData: NewAirportData = {
      airportCode: createAirportDto.airportCode,
      airportName: createAirportDto.airportName,
      city: createAirportDto.city,
      coordinates: createAirportDto.coordinates,
      timezone: createAirportDto.timezone,
    };
    await insertAirportData(newAirportData);
  }

  async findAll() {
    return await this.db.select().from(airportsData);
  }

  async findOne(id: string) {
    // Syntaxe "SQL-like"
    return await this.db
      .select()
      .from(airportsData)
      .where(eq(airportsData.airportCode, id));

    // // Syntaxe "Query API"
    // const airportsData = await this.db.query.airportsData.findMany({
    //   where: eq(airportsData.airportCode, id),
    // });
    // return airportsData;
  }

  async update(id: string, updateAirportDto: UpdateAirportDto) {
    return await this.db
      .update(airportsData)

      // Update certains champs seulement
      // .set({
      //   airportName: updateAirportDto.airportName,
      //   city: updateAirportDto.city,
      //   coordinates: updateAirportDto.coordinates,
      //   timezone: updateAirportDto.timezone,
      // })

      // Update tous les champs
      .set(updateAirportDto)
      .where(eq(airportsData.airportCode, id));
  }

  async remove(id: string) {
    // Todo gérer l'intégrité référentielle
    // const flightsArrival = await this.db.query.flights.findMany({
    //   where: eq(flights.arrivalAirport, id),
    // });
    // if (flightsArrival) {
    //   await this.db.delete(flights).where(eq(flights.arrivalAirport, id));
    // }

    return await this.db
      .delete(airportsData)
      .where(eq(airportsData.airportCode, id));
  }
}
