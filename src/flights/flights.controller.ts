import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
} from '@nestjs/common';
import { FlightsService } from './flights.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller('flights')
export class FlightsController {
  constructor(
    private readonly flightsService: FlightsService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Post()
  create(@Body() createFlightDto: CreateFlightDto) {
    this.logger.log(
      'info',
      'Méthode "%s" - Objet: %s',
      'create',
      createFlightDto,
    );
    return this.flightsService.create(createFlightDto);
  }

  @Get('findByCriteria')
  findByCriteria(
    @Query('departureCity') departureCity: string,
    @Query('arrivalCity') arrivalCity: string,
    @Query('departureDate') departureDate: string,
    @Query('arrivalDate') arrivalDate: string,    
  ) {
    this.logger.log(
      'info',
      'Méthode "%s" - Départ: %s - Arrivée: %s',
      'findByCriteria',
      departureCity,
      arrivalCity,
    );
    return this.flightsService.findByCriteria(departureCity, arrivalCity, departureDate, arrivalDate);
  }

  @Get()
  findAll() {
    this.logger.log('info', 'Méthode "%s"', 'findAll');
    return this.flightsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.log('info', 'Méthode "%s" - Param: %s', 'findOne', id);
    return this.flightsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateFlightDto: UpdateFlightDto,
  ) {
    // Old line
    const updItem = await this.flightsService.findOne(id);

    if (updItem.length > 0) {
      this.logger.log(
        'info',
        'Méthode "%s" - Param: %s - Before: %s - After: %s',
        'update',
        id,
        updItem[0],
        updateFlightDto,
      );
    }
    return this.flightsService.update(id, updateFlightDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const delItem = await this.flightsService.remove(id);

    if (delItem.length > 0) {
      this.logger.log(
        'info',
        'Méthode "%s" - param %s - Objet: %s',
        'delete',
        id,
        delItem[0],
      );
    }

    return delItem;
  }
}
