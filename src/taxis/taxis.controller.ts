import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { CreateTaxiDto } from './dto/create-taxi.dto';
import { TaxisService } from './taxis.service';
import { Taxi } from './entities/taxi.entity';

@Controller('taxis')
export class TaxisController {
  constructor(private readonly taxisService: TaxisService) {}

  @Post()
  async create(@Body() createTaxiDto: CreateTaxiDto): Promise<Taxi> {
    return this.taxisService.create(createTaxiDto);
  }

  @Get()
  async findAll(): Promise<Taxi[]> {
    return this.taxisService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Taxi> {
    return this.taxisService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaxiDto: CreateTaxiDto): Promise<Taxi> {
    return this.taxisService.update(+id, updateTaxiDto);
  }
}