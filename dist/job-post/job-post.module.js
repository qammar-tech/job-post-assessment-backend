"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobPostModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const job_post_entity_1 = require("./job-post.entity");
const job_post_service_1 = require("./job-post.service");
const job_post_controller_1 = require("./job-post.controller");
let JobPostModule = class JobPostModule {
};
exports.JobPostModule = JobPostModule;
exports.JobPostModule = JobPostModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([job_post_entity_1.JobPost])],
        providers: [job_post_service_1.JobPostService],
        controllers: [job_post_controller_1.JobPostController],
        exports: [job_post_service_1.JobPostService],
    })
], JobPostModule);
//# sourceMappingURL=job-post.module.js.map