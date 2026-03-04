import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    height: {
      type: Number, // In cm
    },
    age: {
      type: Number,
    },
    pcodSeverity: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Low',
    },
    irregularCycles: { type: Boolean, default: false },
    hirsutism: { type: Boolean, default: false },
    weightGain: { type: Boolean, default: false },
    familyHistory: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
