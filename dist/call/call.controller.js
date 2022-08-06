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
exports.CallController = void 0;
const common_1 = require("@nestjs/common");
const call_service_1 = require("./call.service");
let CallController = class CallController {
    constructor(CallService) {
        this.CallService = CallService;
    }
    async initCall(inp) {
        const res = await this.CallService.initCall(inp);
        return res;
    }
    async gather(inp) {
        const res = await this.CallService.gather(inp);
        return res;
    }
    async find(params) {
        const lists = await this.CallService.find(params);
        return lists;
    }
    async endCall() {
        return await this.CallService.endCall();
    }
    async downloadRecordings() {
        const res = await this.CallService.downloadRecordings();
        return res;
    }
};
__decorate([
    (0, common_1.Get)('/menu'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CallController.prototype, "initCall", null);
__decorate([
    (0, common_1.Post)('/gather'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CallController.prototype, "gather", null);
__decorate([
    (0, common_1.Get)('/logs'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CallController.prototype, "find", null);
__decorate([
    (0, common_1.Get)('/endcall'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CallController.prototype, "endCall", null);
__decorate([
    (0, common_1.Get)('/downloadRecordings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CallController.prototype, "downloadRecordings", null);
CallController = __decorate([
    (0, common_1.Controller)('call'),
    __metadata("design:paramtypes", [call_service_1.CallService])
], CallController);
exports.CallController = CallController;
//# sourceMappingURL=call.controller.js.map