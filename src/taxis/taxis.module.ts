import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxisController } from './taxis.controller';
import { TaxisService } from './taxis.service';
import { TaxiRepository } from './taxi.repository';
import { Taxi } from './entities/taxi.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Taxi])],
  controllers: [TaxisController],
  providers: [TaxisService, TaxiRepository],
})
export class TaxisModule {}
