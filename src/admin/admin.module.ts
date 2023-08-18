import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Industry } from './industry.entity';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    JwtModule.register({
      secret:
        'f3a43d7f0ea84f5f3569c8c7cb5d5d63913bf843b1b781d69f312bce85863b21',
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([Industry]), // Import UserRepository
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 2,
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }
  ],
})
export class AdminModule {}
