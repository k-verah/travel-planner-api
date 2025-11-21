// src/countries/countries.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Country } from './entities/country/country';
import { RestCountriesApiService } from './providers/restcountries-api.service';
import { TravelPlan } from '../travel-plans/entities/travel-plan.entity';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private readonly repo: Repository<Country>,

    @InjectRepository(TravelPlan)
    private readonly travelPlansRepo: Repository<TravelPlan>,

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

  
  async delete(code: string) {
    const upper = code.toUpperCase();

    const country = await this.repo.findOne({ where: { code: upper } });

    if (!country) {
      throw new NotFoundException(`Country ${upper} not found`);
    }

    const relatedPlans = await this.travelPlansRepo.count({
      where: { countryCode: upper },
    });

    if (relatedPlans > 0) {
      throw new Error(
        `Cannot delete country ${upper} because it has ${relatedPlans} associated travel plans.`,
      );
    }

    await this.repo.delete({ code: upper });

    return {
      message: `Country ${upper} deleted successfully`,
    };
  }
}
