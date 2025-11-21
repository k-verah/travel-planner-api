import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { TravelPlansService } from './travel-plans.service';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';

@Controller('travel-plans')
export class TravelPlansController {
  constructor(private readonly travelPlansService: TravelPlansService) {}

  // ---------------------------------------------------------
  // POST /travel-plans  → Crear plan
  // ---------------------------------------------------------
  @Post()
  create(@Body() dto: CreateTravelPlanDto) {
    return this.travelPlansService.create(dto);
  }

  // ---------------------------------------------------------
  // GET /travel-plans  → Listar todos los planes
  // ---------------------------------------------------------
  @Get()
  findAll() {
    return this.travelPlansService.findAll();
  }

  // ---------------------------------------------------------
  // GET /travel-plans/:id  → Consultar un plan por ID
  // ---------------------------------------------------------
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.travelPlansService.findOne(id);
  }
}



