import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { DeleteCountryGuard } from './guards/delete-country.guard';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  findAll() {
    return this.countriesService.findAll();
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.countriesService.findOne(code);
  }

  @Delete(':code')
  @UseGuards(DeleteCountryGuard)
  delete(@Param('code') code: string) {
    return this.countriesService.delete(code);
  }
}
