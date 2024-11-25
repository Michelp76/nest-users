import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { AirportsService } from './airports.service';
import { CreateAirportDto } from './dto/create-airport.dto';
import { UpdateAirportDto } from './dto/update-airport.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller('airports_data')
export class AirportsController {
  constructor(
    private readonly airportsService: AirportsService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Post()
  create(@Body() createAirportDto: CreateAirportDto) {
    this.logger.log('info', 'Méthode "%s" - Objet: %s', 'create', createAirportDto);
    // info: test message 123 {}
    // this.logger.log('info', 'test message %d', 123);    
    return this.airportsService.create(createAirportDto);
  }

  @Get()
  findAll() {
    this.logger.log('info', 'Méthode "%s"', 'findAll');
    return this.airportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.log('info', 'Méthode "%s" - Param: %s', 'findOne', id);
    return this.airportsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAirportDto: UpdateAirportDto) {
    this.logger.log('info', 'Méthode "%s" - Param: %s - Objet: %s', 'update', id, updateAirportDto);
    return this.airportsService.update(id, updateAirportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.log('info', 'Méthode "%s" - param %s', 'delete', id);
    return this.airportsService.remove(id);
  }
}
