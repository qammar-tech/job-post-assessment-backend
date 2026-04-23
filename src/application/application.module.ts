import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './application.entity';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { JobPostModule } from '../job-post/job-post.module';

@Module({
  imports: [TypeOrmModule.forFeature([Application]), JobPostModule],
  providers: [ApplicationService],
  controllers: [ApplicationController],
})
export class ApplicationModule {}
