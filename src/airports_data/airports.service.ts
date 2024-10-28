import { Inject, Injectable } from '@nestjs/common';
import { CreateAirportDto } from './dto/create-airport.dto';
import { UpdateAirportDto } from './dto/update-airport.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { airportsDataInBookings } from 'src/drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class AirportsService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}
  create(createAirportDto: CreateAirportDto) {
    return 'This action adds a new airport';
  }

  async findAll() {
    return await this.db.select().from(airportsDataInBookings);
  }

  async findOne(id: string) {
    return await this.db
      .select()
      .from(airportsDataInBookings)
      .where(eq(airportsDataInBookings.airportCode, id));
  }

  async update(id: string, updateAirportDto: UpdateAirportDto) {
    return await this.db
    .update(airportsDataInBookings)
    .set({
      city: 'AAAAAAAAA',
    })
    .where(eq(airportsDataInBookings.airportCode, id));
  }

  async remove(id: string) {
    return await this.db.delete(airportsDataInBookings).where(eq(airportsDataInBookings.airportCode, id));
  }
}
