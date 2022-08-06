import { Model } from 'mongoose';
import { Call } from './interfaces/call.interfaces';
import { TwilioClient } from 'nestjs-twilio';
export declare class CallService {
    private CallModel;
    private readonly client;
    constructor(CallModel: Model<Call>, client: TwilioClient);
    initCall(inp: any): Promise<any>;
    gather(inp: any): Promise<any>;
    find(params: object): Promise<any>;
    endCall(): Promise<any>;
    downloadRecordings(): Promise<any[] | "No recording found">;
}
