import mongoose from 'mongoose';

const CommunityPostSchema = new mongoose.Schema({
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    authorName: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    upvotes: { type: Number, default: 0 },
    aiTrustScore: { type: Number, default: 50 }, // 0 to 100 confidence
    isVerified: { type: Boolean, default: false }, // clinical soundness toggle
    tags: { type: [String], default: [] }
}, { timestamps: true });

export default mongoose.models.CommunityPost || mongoose.model('CommunityPost', CommunityPostSchema);
