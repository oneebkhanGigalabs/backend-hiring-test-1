import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateCallDTO } from './dto/call.dto'
import { Call } from './interfaces/call.interfaces'
import { InjectTwilio, TwilioClient } from 'nestjs-twilio'
import axios from 'axios'
const VoiceObj = require('twilio').twiml.VoiceResponse

const MY_NUMBER = '+923055533774'
const BOUGHT_NUMBER = '+12183535634'

@Injectable()
export class CallService {
  constructor (
    @InjectModel('Call') private CallModel: Model<Call>,
    @InjectTwilio() private readonly client: TwilioClient,
  ) {}

  // commented because no out going calls necessary

  // async makeCall (number: string) {
  // console.log('number: ', number);
  //   const newObj = {
  //         to: '+923055533774',
  //         from: '+12183535634',
  //       }
  //   const callObj = await this.client.calls.create({
  //     url: 'http://demo.twilio.com/docs/voice.xml',
  //     ...newObj
  //   })
  //   const created = await new this.CallModel({
  //     ...callObj,
  //   }).save()
  //   return created
  // }

  // initializes the call and asks for input
  async initCall (inp: any) {
    try {
      const voiceResponse = new VoiceObj()
      const gather = voiceResponse.gather({
        action: `/call/gather`,
        numDigits: 1,
        method: 'POST',
      })
      gather.say("Please enter '1' for call forwrding or '2' for voice recording")
      return voiceResponse.toString()
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  // gets user input and decides whether to record or to forward your call
  async gather (inp: any) {
    try {
      // populating the call object in database
      const created = await this.CallModel.findOne({sid: inp.CallSid})
      if (!created) {
        const log = await this.client.calls(inp.CallSid).fetch()
        await new this.CallModel({ ...log }).save()
      }
      const twiml = new VoiceObj()

      // If the user entered digits, process their request
      if (inp && inp.Digits) {
        switch (inp.Digits) {
          // forward call
          case '1':
            await this.CallModel.findOneAndUpdate(
              { sid: inp.CallSid },
              { $set: { status: 'completed', forwarded: true } },
            )
            twiml.say('Forwarding your call.')
            twiml.dial(MY_NUMBER, {
              action: '/call/endcall/',
            })
            return twiml.toString()
            break

          // record call
          case '2':
            await this.CallModel.findOneAndUpdate(
              { sid: inp.CallSid },
              { $set: { status: 'completed', forwarded: false } },
            )
            twiml.say('Recording your call. Leave your message after the beep')
            twiml.record()
            twiml.hangup()
            return twiml.toString()
            break

          // terminate call on wrong number entered
          default:
            twiml.say("Sorry, I don't understand that choice.")
            twiml.pause()
            break
        }
      } else {
        twiml.redirect(`/call/menu`)
      }

      // Render the response as XML in reply to the webhook request
      return twiml.toString()
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async find (params: object) {
    // call logs
    // can pass params as ?params=
    try {
      const calls = await this.client.calls.list({ ...params })
      return calls
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async endCall () {
    try {
      const response = new VoiceObj()
      response.say('Your call has been forwarded. Ending call now')
      response.hangup()
      return response.toString()
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async downloadRecordings (sid: string) {
    try {
      let finalRes = []
      let call: any = await this.client.recordings.list()
      if (sid) {
        call = call.filter((e: any) => e.callSid === sid)
      }
      if (call && call.length) {
        for (let index = 0; index < call.length; index++) {
          const element = call[index];
          const url = `${element.mediaUrl}.mp3`
          const { data } = await axios.get(url)
          finalRes.push(data)
        }
        return finalRes
      }
      return 'No recording found'
    } catch (e) {
      throw new BadRequestException(e)
    }
  }
}
