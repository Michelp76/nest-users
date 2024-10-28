import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { AirportsModule } from './airports/airports.module';
import { ConfigModule } from '@nestjs/config';
import { RoutesModule } from './routes/routes.module';
@Module({
  imports: [
    DrizzleModule,
    AirportsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    RoutesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
