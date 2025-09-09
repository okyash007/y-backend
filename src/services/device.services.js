import Device from "../models/Device.js";

export const createDevice = async (fingerprint) => {
  const deviceData = {
    fingerprint: fingerprint.hash,
    ipAddress: fingerprint.components.deviceConsistent?.ipAddress || "",
    deviceConsistent: fingerprint.components.deviceConsistent || {},
    language:
      fingerprint.components.acceptHeaders?.language ||
      fingerprint.components.deviceConsistent?.language ||
      "",
    timezone:
      fingerprint.components.geoip?.timezone ||
      fingerprint.components.deviceConsistent?.timezone ||
      "",
    os:
      fingerprint.components.useragent?.os ||
      fingerprint.components.deviceConsistent?.os ||
      "",
    platform:
      fingerprint.components.useragent?.platform ||
      fingerprint.components.deviceConsistent?.platform ||
      "",
  };

  // Use findOneAndUpdate with upsert to either find existing device or create new one
  const device = await Device.findOneAndUpdate(
    { fingerprint: fingerprint.hash }, // filter
    { $setOnInsert: deviceData }, // only set data if inserting (creating new)
    { 
      upsert: true, // create if doesn't exist
      new: true, // return the updated/created document
      runValidators: true // run schema validations
    }
  );

  return device;
};
