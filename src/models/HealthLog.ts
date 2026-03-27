import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IHealthLog extends Document {
    userId: mongoose.Types.ObjectId;
    date: Date;
    weight: number;
    symptoms: string[];
    meals: string;
    mood: 'Happy' | 'Calm' | 'Neutral' | 'Anxious' | 'Stressed' | 'Depressed';
    sleepHours: number;
    cycleStatus: 'Normal' | 'Irregular' | 'Period' | 'Ovulation';
    dietScore: number;
    workoutScore: number;
    createdAt: Date;
    updatedAt: Date;
}

const HealthLogSchema = new Schema<IHealthLog>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
            required: true,
        },
        weight: {
            type: Number,
            required: true,
        },
        symptoms: {
            type: [String],
            default: [],
        },
        meals: {
            type: String,
            default: '',
        },
        mood: {
            type: String,
            default: 'Neutral',
            enum: ['Happy', 'Calm', 'Neutral', 'Anxious', 'Stressed', 'Depressed'],
        },
        sleepHours: {
            type: Number,
            default: 7,
            min: 0,
            max: 24,
        },
        cycleStatus: {
            type: String,
            enum: ['Normal', 'Irregular', 'Period', 'Ovulation'],
            default: 'Normal',
        },
        dietScore: {
            type: Number, // 1 to 10
            required: true,
            min: 1,
            max: 10,
        },
        workoutScore: {
            type: Number, // 1 to 10
            required: true,
            min: 1,
            max: 10,
        },
    },
    { timestamps: true }
);

// Index on userId and date for fetching chronological logs
HealthLogSchema.index({ userId: 1, date: -1 });

const HealthLog: Model<IHealthLog> = mongoose.models.HealthLog || mongoose.model<IHealthLog>('HealthLog', HealthLogSchema);
export default HealthLog;
