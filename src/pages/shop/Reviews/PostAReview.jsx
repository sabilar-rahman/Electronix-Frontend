import { Button } from '@/components/ui/button';
import { useGetProductByIdQuery } from '@/redux/featuresApi/products/productsApi';
import { usePostReviewMutation } from '@/redux/featuresApi/reviews/reviewsApi';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const PostAReview = ({ isModalOpen, handleClose }) => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  // Fetch product details for refetching after review submission
  const { refetch } = useGetProductByIdQuery(id, {
    skip: !id,
  });

  const [postReview] = usePostReviewMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !comment.trim()) {
      toast.error('Please provide both a rating and a comment.');
      return;
    }

    const newReview = {
      comment: comment.trim(),
      rating,
      userId: user?._id,
      productId: id,
    };

    try {
      const res = await postReview(newReview).unwrap();
      toast.success(res.message);
      setRating(0);
      setComment('');
      refetch(); // Refresh product details
    } catch (error) {
      const errorMessage =
        error?.data?.message || 'An error occurred while submitting your review.';
      toast.error(errorMessage);
    }
  };

  return isModalOpen ? (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-40 px-2">
      <div className="bg-white p-6 rounded-md shadow-lg w-96 z-50">
        <h2 className="text-lg font-bold mb-4">Post a Review</h2>

        {/* Star Rating */}
        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={`cursor-pointer text-xl ${
                rating >= star ? 'text-yellow-500' : 'text-gray-300'
              }`}
            >
              {rating >= star ? (
                <i className="ri-star-fill"></i>
              ) : (
                <i className="ri-star-line"></i>
              )}
            </span>
          ))}
        </div>

        {/* Comment Input */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          className="w-full border border-gray-300 p-2 rounded-md mb-4"
          placeholder="Write your comment here..."
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <Button
            onClick={handleClose}
           variant="destructive"
          >
            <i className="ri-close-line"></i> Cancel
          </Button>
          <Button
            onClick={handleSubmit}
             variant="default"
          >
            <i className="ri-check-line"></i> Submit
          </Button>
        </div>
      </div>
    </div>
  ) : null;
};

export default PostAReview;
