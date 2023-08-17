import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIndustryDto } from './dto/create-industry.dto';
import { Industry } from './industry.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Industry)
    private readonly industryRepository: Repository<Industry>,
  ) {}

  async createIndustry(createIndustryDto: CreateIndustryDto) {
    const industry = new Industry();
    industry.name = createIndustryDto.name;

    await this.industryRepository.save(industry);
    return { message: 'Industry created successfully' };
  }
}
