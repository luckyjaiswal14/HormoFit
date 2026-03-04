import mongoose from 'mongoose';

const SimulationTrendSchema = new mongoose.Schema(
    {
        day: { type: Number, required: true },
        value: { type: Number, required: true },
    },
    { _id: false }
);

const DigitalTwinSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        bmi: {
            type: Number,
            default: 0,
        },
        insulinResistanceScore: {
            type: Number,
            default: 0,
        },
        cycleRegularityScore: {
            type: Number,
            default: 10, // Starting with a good score
        },
        stressScore: {
            type: Number,
            default: 0,
        },
        inflammationIndex: {
            type: Number,
            default: 0,
        },
        adherenceScore: {
            type: Number,
            default: 5, // 1 to 10, 5 is average
        },
        weightTrend: {
            type: [SimulationTrendSchema], // Predicted 30-day future or past 30 days
            default: [],
        },
        symptomTrend: {
            type: [SimulationTrendSchema],
            default: [],
        },
        hormonalStabilityScore: {
            type: Number,
            default: 50, // 0 to 100
        },
        riskAlert: {
            type: String,
            enum: ['Low', 'Medium', 'High'],
            default: 'Medium',
        },
        hasAvatar: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.models.DigitalTwin || mongoose.model('DigitalTwin', DigitalTwinSchema);
