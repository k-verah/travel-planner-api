import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TravelPlan } from './entities/travel-plan.entity';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';
import { CountriesService } from '../countries/countries.service';

@Injectable()
export class TravelPlansService {
  constructor(
    @InjectRepository(TravelPlan)
    private readonly repo: Repository<TravelPlan>,

    private readonly countriesService: CountriesService,
  ) {}

  // ---------------------------------------------------------
  // CREATE
  // ---------------------------------------------------------
  async create(dto: CreateTravelPlanDto) {
    // 1. Validar que el país exista usando CountriesService y su lógica de caché
    const country = await this.countriesService.findOne(dto.countryCode);

    // 2. Crear y guardar el plan de viaje
    const entity = this.repo.create(dto);
    await this.repo.save(entity);

    return {
      message: 'Travel plan created successfully',
      country,
      plan: entity,
    };
  }

  // ---------------------------------------------------------
  // GET ALL
  // ---------------------------------------------------------
  async findAll(): Promise<TravelPlan[]> {
    return this.repo.find();
  }

  // ---------------------------------------------------------
  // GET ONE BY ID
  // ---------------------------------------------------------
  async findOne(id: number): Promise<TravelPlan> {
    const plan = await this.repo.findOne({ where: { id } });

    if (!plan) {
      throw new NotFoundException(`Travel plan with ID ${id} not found`);
    }

    return plan;
  }
}

