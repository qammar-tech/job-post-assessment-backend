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
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './create-application.dto';
import { UpdateApplicationStatusDto } from './update-application-status.dto';
import { Application } from './application.entity';

interface ApplicationResponse {
  success: boolean;
  data: Application;
}

interface ApplicationListResponse {
  success: boolean;
  count: number;
  data: Application[];
  message?: string;
}

@Controller()
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  /**
   * Submits a physician application for a specific job post.
   * Rejects the request if the job post is not Open.
   */
  @Post('job-posts/:jobPostId/applications')
  @HttpCode(HttpStatus.CREATED)
  async createApplication(
    @Param('jobPostId') jobPostId: string,
    @Body() createApplicationDto: CreateApplicationDto,
  ): Promise<ApplicationResponse> {
    const application = await this.applicationService.createApplication({
      jobPostId,
      dto: createApplicationDto,
    });
    return { success: true, data: application };
  }

  /**
   * Returns all applicants for the given job post, sorted newest first.
   */
  @Get('job-posts/:jobPostId/applications')
  async getApplicationsByJobPost(
    @Param('jobPostId') jobPostId: string,
  ): Promise<ApplicationListResponse> {
    const applications =
      await this.applicationService.getApplicationsByJobPost(jobPostId);
    if (applications.length === 0) {
      return {
        success: true,
        count: 0,
        data: [],
        message: 'No applications yet for this job post.',
      };
    }
    return { success: true, count: applications.length, data: applications };
  }

  /**
   * Updates the status of a specific application.
   * Status can be moved between: Applied, Shortlisted, Rejected.
   */
  @Patch('applications/:id/status')
  async updateApplicationStatus(
    @Param('id') id: string,
    @Body() updateApplicationStatusDto: UpdateApplicationStatusDto,
  ): Promise<ApplicationResponse> {
    const application = await this.applicationService.updateApplicationStatus({
      id,
      dto: updateApplicationStatusDto,
    });
    return { success: true, data: application };
  }
}
