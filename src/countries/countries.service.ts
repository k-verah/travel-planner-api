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

    // 1️⃣ Buscar en BD (caché local)
    const cached = await this.repo.findOne({ where: { code: upper } });

    if (cached) {
      return {
        ...cached,
        origin: 'local-cache',
      };
    }

    // 2️⃣ Consultar API externa
    const external = await this.externalApi.getCountryByCode(upper);

    if (!external) {
      throw new NotFoundException(`Country ${upper} not found`);
    }

    // 3️⃣ Guardar solo los campos necesarios en la BD
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

    // 4️⃣ Devolver indicando que vino de la API externa
    return {
      ...saved,
      origin: 'external-api',
    };
  }
}

