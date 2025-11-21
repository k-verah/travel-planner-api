// src/countries/providers/restcountries-api.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CountriesApi } from './countries-api.interface';

@Injectable()
export class RestCountriesApiService implements CountriesApi {
  constructor(private readonly http: HttpService) {}

  async getCountryByCode(code: string) {
    const url = `https://restcountries.com/v3.1/alpha/${code}`;

    const response = await firstValueFrom(this.http.get(url));
    const data = response.data[0];

    return {
      code: data.cca3,
      name: data.name.common,
      region: data.region,
      subregion: data.subregion,
      capital: data.capital?.[0] ?? 'N/A',
      population: data.population,
      flagUrl: data.flags?.png ?? '',
    };
  }
}
