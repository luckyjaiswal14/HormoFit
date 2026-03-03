import mongoose from 'mongoose';

const HealthLogSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
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

export default mongoose.models.HealthLog || mongoose.model('HealthLog', HealthLogSchema);
