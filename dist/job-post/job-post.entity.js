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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobPost = exports.ScheduleType = void 0;
const typeorm_1 = require("typeorm");
var ScheduleType;
(function (ScheduleType) {
    ScheduleType["FULL_TIME"] = "FULL_TIME";
    ScheduleType["PART_TIME"] = "PART_TIME";
    ScheduleType["CONTRACT"] = "CONTRACT";
    ScheduleType["PER_DIEM"] = "PER_DIEM";
})(ScheduleType || (exports.ScheduleType = ScheduleType = {}));
let JobPost = class JobPost {
    id;
    jobTitle;
    specialty;
    location;
    scheduleType;
    compensation;
    startDate;
    description;
    createdAt;
    updatedAt;
};
exports.JobPost = JobPost;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], JobPost.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], JobPost.prototype, "jobTitle", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], JobPost.prototype, "specialty", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], JobPost.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ScheduleType, nullable: true }),
    __metadata("design:type", Object)
], JobPost.prototype, "scheduleType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], JobPost.prototype, "compensation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Object)
], JobPost.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], JobPost.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], JobPost.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], JobPost.prototype, "updatedAt", void 0);
exports.JobPost = JobPost = __decorate([
    (0, typeorm_1.Entity)('job_posts')
], JobPost);
//# sourceMappingURL=job-post.entity.js.map