import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './application.entity';
import { CreateApplicationDto } from './create-application.dto';
import { UpdateApplicationStatusDto } from './update-application-status.dto';
import { JobPostService } from '../job-post/job-post.service';
import { JobPostStatus } from '../job-post/job-post.entity';

interface CreateApplicationInput {
  readonly jobPostId: string;
  readonly dto: CreateApplicationDto;
}

interface UpdateApplicationStatusInput {
  readonly id: string;
  readonly dto: UpdateApplicationStatusDto;
}

@Injectable()
export class ApplicationService {
  private readonly logger = new Logger(ApplicationService.name);

  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    private readonly jobPostService: JobPostService,
  ) {}

  /**
   * Creates a new application for the given job post.
   * Enforces that the job post must be in OPEN status to accept applications.
   *
   * @throws NotFoundException if the job post does not exist
   * @throws BadRequestException if the job post is not OPEN
   */
  async createApplication({
    jobPostId,
    dto,
  }: CreateApplicationInput): Promise<Application> {
    const jobPost = await this.jobPostService.findOneById(jobPostId);
    if (!jobPost) {
      throw new NotFoundException('Job post not found');
    }
    if (jobPost.status !== JobPostStatus.OPEN) {
      throw new BadRequestException(
        'Applications can only be submitted for Open job posts.',
      );
    }
    const application = this.applicationRepository.create({
      ...dto,
      jobPost,
    });
    try {
      return await this.applicationRepository.save(application);
    } catch (error) {
      this.logger.error('Failed to save application', error);
      throw new InternalServerErrorException(
        'Could not submit application. Please try again.',
      );
    }
  }

  /**
   * Returns all applications for the given job post, sorted by creation date descending.
   *
   * @throws NotFoundException if the job post does not exist
   */
  async getApplicationsByJobPost(jobPostId: string): Promise<Application[]> {
    const jobPost = await this.jobPostService.findOneById(jobPostId);
    if (!jobPost) {
      throw new NotFoundException('Job post not found');
    }
    try {
      return await this.applicationRepository.find({
        where: { jobPost: { id: jobPostId } },
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      this.logger.error('Failed to retrieve applications', error);
      throw new InternalServerErrorException(
        'Could not retrieve applications. Please try again.',
      );
    }
  }

  /**
   * Updates the status of an existing application.
   *
   * @throws NotFoundException if no application exists with the given id
   */
  async updateApplicationStatus({
    id,
    dto,
  }: UpdateApplicationStatusInput): Promise<Application> {
    let application: Application | null;
    try {
      application = await this.applicationRepository.findOne({ where: { id } });
    } catch (error) {
      this.logger.error('Failed to fetch application for status update', error);
      throw new InternalServerErrorException(
        'Could not fetch application. Please try again.',
      );
    }
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    application.status = dto.status;
    try {
      return await this.applicationRepository.save(application);
    } catch (error) {
      this.logger.error('Failed to save application status update', error);
      throw new InternalServerErrorException(
        'Could not update application status. Please try again.',
      );
    }
  }
}
