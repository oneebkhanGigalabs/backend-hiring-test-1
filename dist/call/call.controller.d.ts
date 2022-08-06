import { CallService } from './call.service';
export declare class CallController {
    private readonly CallService;
    constructor(CallService: CallService);
    initCall(inp: any): Promise<any>;
    gather(inp: any): Promise<any>;
    find(params: object): Promise<any>;
    endCall(): Promise<any>;
    downloadRecordings(): Promise<any[] | "No recording found">;
}
