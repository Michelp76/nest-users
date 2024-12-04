import { Module } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [FlightsController],
  providers: [FlightsService],
  imports: [DrizzleModule]  
})
export class FlightsModule {}
