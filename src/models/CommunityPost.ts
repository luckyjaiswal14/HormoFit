import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ICommunityPost extends Document {
    authorId: mongoose.Types.ObjectId;
    authorName: string;
    title: string;
    content: string;
    upvotes: number;
    aiTrustScore: number;
    isVerified: boolean;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

const CommunityPostSchema = new Schema<ICommunityPost>({
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    authorName: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    upvotes: { type: Number, default: 0 },
    aiTrustScore: { type: Number, default: 50 }, // 0 to 100 confidence
    isVerified: { type: Boolean, default: false }, // clinical soundness toggle
    tags: { type: [String], default: [] }
}, { timestamps: true });

CommunityPostSchema.index({ authorId: 1 });
CommunityPostSchema.index({ createdAt: -1 });

const CommunityPost: Model<ICommunityPost> = mongoose.models.CommunityPost || mongoose.model<ICommunityPost>('CommunityPost', CommunityPostSchema);
export default CommunityPost;
