import { Repository } from 'typeorm';
import { JobPost } from './job-post.entity';
import { CreateJobPostDto } from './create-job-post.dto';
export declare class JobPostService {
    private readonly jobPostRepository;
    private readonly logger;
    constructor(jobPostRepository: Repository<JobPost>);
    createJobPost(dto: CreateJobPostDto): Promise<JobPost>;
    getAllJobPosts(): Promise<JobPost[]>;
}
