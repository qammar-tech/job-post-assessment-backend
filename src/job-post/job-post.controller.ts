import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JobPostService } from './job-post.service';
import { CreateJobPostDto } from './create-job-post.dto';
import { UpdateJobPostStatusDto } from './update-job-post-status.dto';
import { JobPost } from './job-post.entity';

interface JobPostResponse {
  success: boolean;
  data: JobPost;
}

interface JobPostListResponse {
  success: boolean;
  count: number;
  data: JobPost[];
  message?: string;
}

@Controller('job-posts')
export class JobPostController {
  constructor(private readonly jobPostService: JobPostService) {}

  /**
   * Creates a new job post and returns it wrapped in a success envelope.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createJobPost(
    @Body() createJobPostDto: CreateJobPostDto,
  ): Promise<JobPostResponse> {
    const jobPost = await this.jobPostService.createJobPost(createJobPostDto);
    return { success: true, data: jobPost };
  }

  /**
   * Returns all job posts sorted by creation date descending.
   * Returns an empty-state envelope when no records exist.
   */
  @Get()
  async getAllJobPosts(): Promise<JobPostListResponse> {
    const jobPosts = await this.jobPostService.getAllJobPosts();
    if (jobPosts.length === 0) {
      return {
        success: true,
        count: 0,
        data: [],
        message: 'No job posts available',
      };
    }
    return { success: true, count: jobPosts.length, data: jobPosts };
  }

  /**
   * Updates the status of an existing job post.
   * Enforces the rule that a post cannot transition to OPEN without required fields.
   */
  @Patch(':id/status')
  async updateJobPostStatus(
    @Param('id') id: string,
    @Body() updateJobPostStatusDto: UpdateJobPostStatusDto,
  ): Promise<JobPostResponse> {
    const jobPost = await this.jobPostService.updateJobPostStatus(id, updateJobPostStatusDto);
    return { success: true, data: jobPost };
  }
}
