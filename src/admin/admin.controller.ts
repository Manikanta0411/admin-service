import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/guards/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AdminService } from './admin.service';
import { CreateIndustryDto } from './dto/create-industry.dto';
// import { Request } from 'express';
import { RateLimit } from 'nestjs-rate-limiter';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('admin')
// @SkipThrottle() // this is to skip the rate limitter for entire class
@UseGuards(RolesGuard) // Protect the route
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('create-industry')
  @Roles('admin', 'user')
  // @SkipThrottle(false) // this is to skip the rate limitter for this api
  async createIndustry(
    @Body() createIndustryDto: CreateIndustryDto,
    // @Req() request: Request,
  ) {
    // IDP
    // console.log('Headers:', request.headers);
    return this.adminService.createIndustry(createIndustryDto);
  }
}
