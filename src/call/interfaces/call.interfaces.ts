import { Document, Mongoose } from 'mongoose';

export interface Call extends Document {
  sid: string;
  dateCreated?: string;
  dateUpdated?: string;
  parentCallSid?: string;
  accountSid?: string;
  to?: string;
  toFormatted?: string;
  from?: string;
  fromFormatted?: string;
  phoneNumberSid?: string;
  status?: string;
  startTime?: string;
  endTime?: string;
  duration?: string;
  price?: string;
  priceUnit?: string;
  direction?: string;
  answeredBy?: string;
  apiVersion?: string;
  forwardedFrom?: string;
  groupSid?: string;
  callerName?: string;
  queueTime?: string;
  trunkSid?: string;
  uri?: string;
  subresourceUris?: any;
  forwarded?: boolean
}