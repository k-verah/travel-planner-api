// src/countries/countries.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './entities/country/country';
import { RestCountriesApiService } from './providers/restcountries-api.service';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private readonly repo: Repository<Country>,

    private readonly externalApi: RestCountriesApiService,
  ) {}

  async findAll() {
    return this.repo.find();
  }

  async findOne(code: string) {
    const upper = code.toUpperCase();


    const cached = await this.repo.findOne({ where: { code: upper } });

    if (cached) {
      return {
        ...cached,
        origin: 'local-cache',
      };
    }


    const external = await this.externalApi.getCountryByCode(upper);

    if (!external) {
      throw new NotFoundException(`Country ${upper} not found`);
    }


    const saved = await this.repo.save(
      this.repo.create({
        code: external.code,
        name: external.name,
        region: external.region,
        subregion: external.subregion,
        capital: external.capital,
        population: external.population,
        flagUrl: external.flagUrl,
      }),
    );

    
    return {
      ...saved,
      origin: 'external-api',
    };
  }
}

