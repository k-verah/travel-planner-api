export interface CountriesApi {
  getCountryByCode(
    code: string,
  ): Promise<{
    code: string;
    name: string;
    region: string;
    subregion: string;
    capital: string;
    population: number;
    flagUrl: string;
  }>;
}
