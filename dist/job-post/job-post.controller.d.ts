import { JobPostService } from './job-post.service';
import { CreateJobPostDto } from './create-job-post.dto';
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
export declare class JobPostController {
    private readonly jobPostService;
    constructor(jobPostService: JobPostService);
    createJobPost(createJobPostDto: CreateJobPostDto): Promise<JobPostResponse>;
    getAllJobPosts(): Promise<JobPostListResponse>;
}
export {};
