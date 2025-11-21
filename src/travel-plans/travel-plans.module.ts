import { Module, MiddlewareConsumer, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TravelPlan } from './entities/travel-plan.entity';
import { TravelPlansService } from './travel-plans.service';
import { TravelPlansController } from './travel-plans.controller';

import { CountriesModule } from '../countries/countries.module';
import { LoggingMiddleware } from '../common/middleware/logging.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([TravelPlan]),
    forwardRef(() => CountriesModule),
  ],
  controllers: [TravelPlansController],
  providers: [TravelPlansService],
  exports: [TravelPlansService],
})
export class TravelPlansModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes(TravelPlansController);
  }
}
