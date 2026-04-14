"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var JobPostService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobPostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const job_post_entity_1 = require("./job-post.entity");
let JobPostService = JobPostService_1 = class JobPostService {
    jobPostRepository;
    logger = new common_1.Logger(JobPostService_1.name);
    constructor(jobPostRepository) {
        this.jobPostRepository = jobPostRepository;
    }
    async createJobPost(dto) {
        const jobPost = this.jobPostRepository.create(dto);
        try {
            return await this.jobPostRepository.save(jobPost);
        }
        catch (error) {
            this.logger.error('Failed to save job post', error);
            throw new common_1.InternalServerErrorException('Could not create job post. Please try again.');
        }
    }
    async getAllJobPosts() {
        try {
            return await this.jobPostRepository.find({
                order: { createdAt: 'DESC' },
            });
        }
        catch (error) {
            this.logger.error('Failed to retrieve job posts', error);
            throw new common_1.InternalServerErrorException('Could not retrieve job posts. Please try again.');
        }
    }
};
exports.JobPostService = JobPostService;
exports.JobPostService = JobPostService = JobPostService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(job_post_entity_1.JobPost)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], JobPostService);
//# sourceMappingURL=job-post.service.js.map