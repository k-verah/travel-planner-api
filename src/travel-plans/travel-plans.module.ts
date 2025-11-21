import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TravelPlan } from './entities/travel-plan.entity';
import { TravelPlansService } from './travel-plans.service';
import { TravelPlansController } from './travel-plans.controller';

// Importamos CountriesModule para reutilizar su servicio y la lógica de caché
import { CountriesModule } from '../countries/countries.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TravelPlan]),
    CountriesModule, // <<--- IMPORTANTE
  ],
  controllers: [TravelPlansController],
  providers: [TravelPlansService],
})
export class TravelPlansModule {}

