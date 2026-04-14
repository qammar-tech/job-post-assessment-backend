"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const statusCode = exception.getStatus();
        const exceptionResponse = exception.getResponse();
        const body = this.buildResponseBody(statusCode, exceptionResponse);
        response.status(statusCode).json(body);
    }
    buildResponseBody(statusCode, exceptionResponse) {
        if (typeof exceptionResponse === 'string') {
            return { success: false, statusCode, message: exceptionResponse };
        }
        const responseObj = exceptionResponse;
        const rawMessage = responseObj['message'];
        if (Array.isArray(rawMessage)) {
            return { success: false, statusCode, errors: rawMessage };
        }
        return {
            success: false,
            statusCode,
            message: rawMessage ?? common_1.HttpStatus[statusCode],
        };
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], HttpExceptionFilter);
//# sourceMappingURL=http-exception.filter.js.map