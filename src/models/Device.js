import mongoose, { Schema } from 'mongoose';

const deviceSchema = new Schema(
  {
    fingerprint: {
      type: String,
      required: [true, "Fingerprint is required"],
      trim: true,
    },
    ipAddress: {
      type: String,
      required: [true, "IP Address is required"],
      trim: true,
    },
    deviceConsistent: {
      type: Object,
      required: [true, "Device Consistent is required"],
    },
    language: {
      type: String,
      required: [true, "Language is required"],
      trim: true,
    },
    timezone: {
      type: String,
      required: [true, "Timezone is required"],
      trim: true,
    },
    os: {
      type: String,
      required: [true, "OS is required"],
      trim: true,
    },
    platform: {
      type: String,
      required: [true, "Platform is required"],
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Device = mongoose.model("devices", deviceSchema);

export default Device;
