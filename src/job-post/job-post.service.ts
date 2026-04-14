import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPost } from './job-post.entity';
import { CreateJobPostDto } from './create-job-post.dto';

@Injectable()
export class JobPostService {
  private readonly logger = new Logger(JobPostService.name);

  constructor(
    @InjectRepository(JobPost)
    private readonly jobPostRepository: Repository<JobPost>,
  ) {}

  /**
   * Creates and persists a new job post from the provided DTO.
   * Returns the full saved entity including auto-generated fields.
   */
  async createJobPost(dto: CreateJobPostDto): Promise<JobPost> {
    const jobPost = this.jobPostRepository.create(dto);
    try {
      return await this.jobPostRepository.save(jobPost);
    } catch (error) {
      this.logger.error('Failed to save job post', error);
      throw new InternalServerErrorException(
        'Could not create job post. Please try again.',
      );
    }
  }

  /**
   * Returns all job posts sorted by creation date descending (newest first).
   * Returns an empty array when no records exist.
   */
  async getAllJobPosts(): Promise<JobPost[]> {
    try {
      return await this.jobPostRepository.find({
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      this.logger.error('Failed to retrieve job posts', error);
      throw new InternalServerErrorException(
        'Could not retrieve job posts. Please try again.',
      );
    }
  }
}
