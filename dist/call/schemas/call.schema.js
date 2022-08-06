"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallSchema = void 0;
const mongoose = require("mongoose");
exports.CallSchema = new mongoose.Schema({
    sid: String,
    dateCreated: String,
    dateUpdated: String,
    parentCallSid: String,
    accountSid: String,
    to: String,
    toFormatted: String,
    from: String,
    fromFormatted: String,
    phoneNumberSid: String,
    status: String,
    startTime: String,
    endTime: String,
    duration: String,
    price: String,
    priceUnit: String,
    direction: String,
    answeredBy: String,
    apiVersion: String,
    forwardedFrom: String,
    groupSid: String,
    callerName: String,
    queueTime: String,
    trunkSid: String,
    uri: String,
    subresourceUris: Object,
    forwarded: Boolean,
}, { timestamps: true });
//# sourceMappingURL=call.schema.js.map