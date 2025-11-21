import { Module, forwardRef, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { Country } from './entities/country/country';
import { RestCountriesApiService } from './providers/restcountries-api.service';
import { TravelPlan } from '../travel-plans/entities/travel-plan.entity';

import { TravelPlansModule } from '../travel-plans/travel-plans.module';
import { LoggingMiddleware } from '../common/middleware/logging.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Country, TravelPlan]),
    HttpModule,
    forwardRef(() => TravelPlansModule),
  ],
  controllers: [CountriesController],
  providers: [CountriesService, RestCountriesApiService],
  exports: [CountriesService],
})
export class CountriesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes(CountriesController);
  }
}
