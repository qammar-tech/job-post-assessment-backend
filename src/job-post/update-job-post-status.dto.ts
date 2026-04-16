import { IsEnum, IsNotEmpty } from 'class-validator';
import { JobPostStatus } from './job-post.entity';

export class UpdateJobPostStatusDto {
  @IsNotEmpty()
  @IsEnum(JobPostStatus)
  status: JobPostStatus;
}
