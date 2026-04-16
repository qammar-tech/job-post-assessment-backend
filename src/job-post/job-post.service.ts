import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPost, JobPostStatus } from './job-post.entity';
import { CreateJobPostDto } from './create-job-post.dto';
import { UpdateJobPostStatusDto } from './update-job-post-status.dto';

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

  /**
   * Updates the status of an existing job post.
   * Enforces the rule that a post cannot be set to OPEN unless
   * jobTitle, specialty, and location are all non-empty.
   *
   * @throws NotFoundException if no job post exists with the given id
   * @throws BadRequestException if attempting to set status to OPEN with missing required fields
   */
  async updateJobPostStatus(
    id: string,
    dto: UpdateJobPostStatusDto,
  ): Promise<JobPost> {
    let jobPost: JobPost | null;
    try {
      jobPost = await this.jobPostRepository.findOne({ where: { id } });
    } catch (error) {
      this.logger.error('Failed to fetch job post for status update', error);
      throw new InternalServerErrorException(
        'Could not fetch job post. Please try again.',
      );
    }
    if (!jobPost) {
      throw new NotFoundException('Job post not found');
    }
    if (dto.status === JobPostStatus.OPEN) {
      this.assertRequiredFieldsPresent(jobPost);
    }
    jobPost.status = dto.status;
    try {
      return await this.jobPostRepository.save(jobPost);
    } catch (error) {
      this.logger.error('Failed to save job post status update', error);
      throw new InternalServerErrorException(
        'Could not update job post status. Please try again.',
      );
    }
  }

  private assertRequiredFieldsPresent(jobPost: JobPost): void {
    const hasRequiredFields =
      jobPost.jobTitle?.trim().length > 0 &&
      jobPost.specialty?.trim().length > 0 &&
      jobPost.location?.trim().length > 0;
    if (!hasRequiredFields) {
      throw new BadRequestException(
        'Job post cannot be set to Open: job title, specialty, and location are required.',
      );
    }
  }
}
