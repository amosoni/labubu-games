'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, Flag, User, Calendar } from 'lucide-react';

interface Comment {
  _id: string;
  author: string;
  rating: number;
  content: string;
  createdAt: string;
  likes: number;
}

interface CommentListProps {
  gameId: string;
}

export default function CommentList({ gameId }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(`/api/comments?gameId=${gameId}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  }, [gameId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleLike = (commentId: string) => {
    // 这里可以添加点赞功能
    console.log('Liked comment:', commentId);
  };

  const handleReport = (commentId: string) => {
    // 这里可以添加举报功能
    console.log('Reported comment:', commentId);
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading comments...</p>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Star className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">No comments yet</h3>
        <p className="text-gray-500">Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment, index) => (
        <motion.div
          key={comment._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg p-4 border border-gray-200"
        >
          {/* 评论头部 */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{comment.author}</h4>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= comment.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {comment.rating} stars
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* 评论内容 */}
          <p className="text-gray-700 mb-3">{comment.content}</p>

          {/* 评论操作 */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleLike(comment._id)}
              className="flex items-center space-x-1 text-gray-500 hover:text-pink-500 transition-colors"
            >
              <ThumbsUp className="w-4 h-4" />
              <span className="text-sm">Like</span>
            </button>
            <button
              onClick={() => handleReport(comment._id)}
              className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
            >
              <Flag className="w-4 h-4" />
              <span className="text-sm">Report</span>
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
 