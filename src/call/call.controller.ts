import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
  Put,
  Query,
  Res,
  Param
} from '@nestjs/common';
import { CallService } from './call.service';
import { CreateCallDTO } from './dto/call.dto';

// get all: localhost:3000/call
// create: localhost:3000/call/create    #add the body for the object to be added
// get one: localhost:3000/call/api/?id=<the id>
// delete one: localhost:3000/call/api/?id=<the id>
// update one: localhost:3000/call/api/?id=<your id>  #you have to write the updated body

@Controller('call')
export class CallController {
  constructor(private readonly CallService: CallService) {}

  // commented because no out going calls necessary

  // // initializes the call (outgoing)
  // @Get('/')
  // async redirect(@Res() res: any, @Param() number: any) {
  //   const result = await this.CallService.makeCall(number.number);
  //   return res.redirect(`/call/menu/${result.sid}`);
  // }
  
  // speaks to the caller
  @Get('/menu')
  async initCall(@Body() inp: any) {
    const res = await this.CallService.initCall(inp);
    return res;
  }

  // gather the input from the user either 1 or 2
  @Post('/gather')
  async gather(@Body() inp: any) {
    const res = await this.CallService.gather(inp);
    return res;
  }

  // shows all the call logs
  @Get('/logs')
  async find(@Param() params: object) {
    const lists = await this.CallService.find(params);
    return lists;
  }

  // shows all the call logs
  @Get('/endcall')
  async endCall() {
    return await this.CallService.endCall();
  }

  // shows all the call logs
  @Get('/downloadRecordings')
  async downloadRecordings(@Param() sid: any) {
    const res = await this.CallService.downloadRecordings(sid && sid.sid);
    return res
  }
}