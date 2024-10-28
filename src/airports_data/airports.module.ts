import { Module } from '@nestjs/common';
import { AirportsService } from './airports.service';
import { AirportsController } from './airports.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [AirportsController],
  providers: [AirportsService],
  imports: [DrizzleModule]
})
export class AirportsModule {}
