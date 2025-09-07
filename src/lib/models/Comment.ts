import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
  gameSlug: string; // 改为gameSlug
  author: string;
  content: string;
  rating: number;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>({
  gameSlug: { type: String, required: true }, // 改为gameSlug
  author: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  likes: { type: Number, default: 0 },
}, {
  timestamps: true,
});

export default mongoose.models.Comment || mongoose.model<IComment>('Comment', commentSchema); 