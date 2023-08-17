import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/guards/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AdminService } from './admin.service';
import { CreateIndustryDto } from './dto/create-industry.dto';
// import { Request } from 'express';

@Controller('admin')
@UseGuards(RolesGuard) // Protect the route
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('create-industry')
  @Roles('admin')
  async createIndustry(
    @Body() createIndustryDto: CreateIndustryDto,
    // @Req() request: Request,
  ) {
    //IDP
    // console.log('Headers:', request.headers);
    return this.adminService.createIndustry(createIndustryDto);
  }
}
