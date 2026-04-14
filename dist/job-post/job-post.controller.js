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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobPostController = void 0;
const common_1 = require("@nestjs/common");
const job_post_service_1 = require("./job-post.service");
const create_job_post_dto_1 = require("./create-job-post.dto");
let JobPostController = class JobPostController {
    jobPostService;
    constructor(jobPostService) {
        this.jobPostService = jobPostService;
    }
    async createJobPost(createJobPostDto) {
        const jobPost = await this.jobPostService.createJobPost(createJobPostDto);
        return { success: true, data: jobPost };
    }
    async getAllJobPosts() {
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
};
exports.JobPostController = JobPostController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_job_post_dto_1.CreateJobPostDto]),
    __metadata("design:returntype", Promise)
], JobPostController.prototype, "createJobPost", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JobPostController.prototype, "getAllJobPosts", null);
exports.JobPostController = JobPostController = __decorate([
    (0, common_1.Controller)('job-posts'),
    __metadata("design:paramtypes", [job_post_service_1.JobPostService])
], JobPostController);
//# sourceMappingURL=job-post.controller.js.map