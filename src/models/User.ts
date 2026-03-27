import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  height?: number; // In cm
  age?: number;
  pcodSeverity: 'Low' | 'Medium' | 'High';
  irregularCycles: boolean;
  hirsutism: boolean;
  weightGain: boolean;
  familyHistory: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
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

// Index for performance
UserSchema.index({ email: 1 });

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
