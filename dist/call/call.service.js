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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const nestjs_twilio_1 = require("nestjs-twilio");
const axios_1 = require("axios");
const VoiceObj = require('twilio').twiml.VoiceResponse;
const MY_NUMBER = '+923055533774';
const BOUGHT_NUMBER = '+12183535634';
let CallService = class CallService {
    constructor(CallModel, client) {
        this.CallModel = CallModel;
        this.client = client;
    }
    async initCall(inp) {
        try {
            const voiceResponse = new VoiceObj();
            const gather = voiceResponse.gather({
                action: `/call/gather`,
                numDigits: 1,
                method: 'POST',
            });
            gather.say('Please enter 1 for call forwrding or 2 for voice recording');
            return voiceResponse.toString();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async gather(inp) {
        try {
            const created = await this.CallModel.findOne({
                where: { sid: inp.CallSid },
                select: ['sid'],
            });
            if (!created) {
                const log = await this.client.calls(inp.CallSid).fetch();
                await new this.CallModel(Object.assign({}, log)).save();
            }
            const twiml = new VoiceObj();
            if (inp && inp.Digits) {
                switch (inp.Digits) {
                    case '1':
                        twiml.say('Forwarding your call.');
                        twiml.dial(MY_NUMBER, {
                            action: '/call/endcall/',
                        });
                        const firstCase = await this.client.calls(inp.CallSid).fetch();
                        if (firstCase && firstCase.sid) {
                            await this.CallModel.findOneAndUpdate({ sid: inp.CallSid }, { $set: { status: 'completed', forwarded: true } });
                        }
                        return twiml.toString();
                        break;
                    case '2':
                        twiml.say('Recording your call. Leave your message after the beep');
                        twiml.record();
                        twiml.hangup();
                        await this.CallModel.findOneAndUpdate({ sid: inp.CallSid }, { $set: { status: 'completed', forwarded: false } });
                        return twiml.toString();
                        break;
                    default:
                        twiml.say("Sorry, I don't understand that choice.");
                        twiml.pause();
                        break;
                }
            }
            else {
                twiml.redirect(`/call/menu`);
            }
            return twiml.toString();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async find(params) {
        try {
            const calls = await this.client.calls.list(Object.assign({}, params));
            return calls;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async endCall() {
        try {
            const response = new VoiceObj();
            response.say('Your call has been forwarded. Ending call now');
            response.hangup();
            return response.toString();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async downloadRecordings() {
        try {
            let finalRes = [];
            const call = await this.client.recordings.list();
            console.log('call: ', call);
            if (call && call.length) {
                for (let index = 0; index < call.length; index++) {
                    const element = call[index];
                    console.log('element: ', element);
                    const url = `${element.mediaUrl}.mp3`;
                    console.log('recording13123123: ');
                    const { data } = await axios_1.default.get(url);
                    finalRes.push(data);
                }
                return finalRes;
            }
            return 'No recording found';
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
    }
};
CallService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Call')),
    __param(1, (0, nestjs_twilio_1.InjectTwilio)()),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof nestjs_twilio_1.TwilioClient !== "undefined" && nestjs_twilio_1.TwilioClient) === "function" ? _b : Object])
], CallService);
exports.CallService = CallService;
//# sourceMappingURL=call.service.js.map