import mongoose from 'mongoose';

export interface IGame {
  _id?: string;
  title: string;
  description: string;
  embedUrl: string;
  thumbnailUrl: string;
  category: string;
  tags: string[];
  language: string;
  featured: boolean;
  popularity: number;
  createdAt: Date;
  updatedAt: Date;
}

const gameSchema = new mongoose.Schema<IGame>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  embedUrl: {
    type: String,
    required: true,
    unique: true,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['dress-up', 'makeup', 'simulation', 'nurturing', 'adventure', 'puzzle', 'romance', 'monster'],
  },
  tags: [{
    type: String,
    trim: true,
  }],
  language: {
    type: String,
    default: 'en',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  popularity: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

gameSchema.index({ title: 'text', description: 'text', tags: 'text' });
gameSchema.index({ category: 1 });
gameSchema.index({ featured: -1, popularity: -1 });

export default mongoose.models.Game || mongoose.model<IGame>('Game', gameSchema);