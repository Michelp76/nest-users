import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { AirportsModule } from './airports_data/airports.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    DrizzleModule,
    AirportsModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
