import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { AirportsModule } from './airports_data/airports.module';
import { ConfigModule } from '@nestjs/config';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
@Module({
  imports: [
    DrizzleModule,
    AirportsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    WinstonModule.forRoot({
      format: winston.format.combine(
        // winston.format.label({ label: '[my-label]' }),
        winston.format.splat(),
        winston.format.json(),
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.printf(
          (info) => `${info.timestamp} | ${info.level} | ${info.message}`,
        ),
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike('NestApp', {
              colors: true,
              prettyPrint: true,
              processId: true,
              appName: true,
            }),
          ),
        }),
        //
        // - Write to all logs with level `info` and below to `quick-start-combined.log`.
        // - Write all logs error (and below) to `quick-start-error.log`.
        //
        new winston.transports.File({
          filename: 'quick-start-combined.log',
        }),
        new winston.transports.File({
          filename: 'quick-start-error.log',
          level: 'error',
        }),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
