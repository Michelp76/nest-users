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
import 'winston-daily-rotate-file';
import { SeqTransport } from '@datalust/winston-seq';

// const transComb = new winston.transports.DailyRotateFile({
//   filename: 'logs/combined-%DATE%.log',
//   datePattern: 'YYYY-MM-DD-HH',
//   zippedArchive: true,
//   maxSize: '20m',
//   maxFiles: '14d',
// });

// const transError = new winston.transports.DailyRotateFile({
//   filename: 'logs/error-%DATE%.log',
//   datePattern: 'YYYY-MM-DD-HH',
//   zippedArchive: true,
//   maxSize: '20m',
//   maxFiles: '14d',
//   level: 'error',
// });

@Module({
  imports: [
    DrizzleModule,
    AirportsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    WinstonModule.forRoot({
      level: process.env.LOG_LEVEL || 'info',
      format: winston.format.combine(
        // winston.format.label({ label: '[my-label]' }),
        winston.format.splat(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.align(),
        winston.format.printf(
          (info) => `${info.timestamp} | ${info.level} | ${info.message}`,
        ),
      ),
      handleExceptions: true,
      handleRejections: true,
      defaultMeta: { application: 'NestApp' },
      transports: [
        // Logs in console
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
        // DailyRotateFiles...
        // transComb,
        // transError,
        // ...

        // Logs in Seq
        new SeqTransport({
          serverUrl: 'http://localhost:5341/',
          apiKey: '12345678901234567890',
          onError: (e) => {
            console.error(e);
          },
          handleExceptions: true,
          handleRejections: true,
        }),
        //
        // - Write to all logs with level `info` and below to `quick-start-combined.log`.
        // - Write all logs error (and below) to `quick-start-error.log`.
        //
        // new winston.transports.File({
        //   filename: 'quick-start-combined.log',
        // }),
        // new winston.transports.File({
        //   filename: 'quick-start-error.log',
        //   level: 'error',
        // }),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
