import RatingStars from "@/utils/RatingStars";
import { useState } from "react";
import PostAReview from "./PostAReview";
import { Button } from "@/components/ui/button";

const ReviewCard = ({ productReviews }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenReviewModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseReviewModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      {productReviews.length > 0 ? (
        <div className="space-y-4">
          {productReviews.map((review) => (
            <div
              key={review._id}
              className="p-4 border rounded shadow-sm bg-gray-50"
            >
              {/* Review Comment */}
              <p className="text-gray-700">
                {review.comment || "No comment provided."}
              </p>

              {/* Review Details */}
              <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                <span>
                  By{" "}
                  <span className="font-semibold">
                    {review.userId?.name || "Anonymous"}
                  </span>
                </span>
                <span className="text-yellow-500 font-semibold">
                  Rating:
                  <RatingStars rating={review.rating} />
                </span>
              </div>

              {/* Review Date */}
              <p className="mt-1 text-gray-400 text-xs">
                Reviewed on {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No reviews yet for this product.</p>
      )}


      {/* comment section */}


<div className="mt-6">
    <Button variant="default" onClick={handleOpenReviewModal}> Post Review</Button>

</div>
      <PostAReview
        isModalOpen={isModalOpen}
        handleClose={handleCloseReviewModal}
      />
    </div>
  );
};

export default ReviewCard;
