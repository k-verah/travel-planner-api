// src/countries/countries.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { Country } from './entities/country/country';
import { RestCountriesApiService } from './providers/restcountries-api.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Country]),
    HttpModule, // necesario para HttpService dentro de RestCountriesApiService
  ],
  controllers: [CountriesController],
  providers: [CountriesService, RestCountriesApiService],
  exports: [CountriesService],
})
export class CountriesModule {}
