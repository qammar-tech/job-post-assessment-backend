import { ScheduleType } from './job-post.entity';
export declare class CreateJobPostDto {
    jobTitle: string;
    specialty: string;
    location: string;
    scheduleType?: ScheduleType;
    compensation?: string;
    startDate?: string;
    description?: string;
}
