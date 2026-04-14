import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPost } from './job-post.entity';
import { JobPostService } from './job-post.service';
import { JobPostController } from './job-post.controller';

@Module({
  imports: [TypeOrmModule.forFeature([JobPost])],
  providers: [JobPostService],
  controllers: [JobPostController],
  exports: [JobPostService],
})
export class JobPostModule {}
