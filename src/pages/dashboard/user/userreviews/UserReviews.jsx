import { useGetReviewByIdQuery } from '@/redux/featuresApi/reviews/reviewsApi';
import Loading from '@/utils/Loading';
import { useSelector } from 'react-redux';

const UserReviews = () => {

    const { user } = useSelector((state) => state.auth);
    const { data , error, isLoading } = useGetReviewByIdQuery(user?._id);

    

    // Ensure reviews is extracted properly from data
    const reviews = data?.reviews || [];

    console.log(reviews);

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <h1>No reviews</h1>;
    }

    return (
        <div className="max-w-6xl mx-auto p-6 rounded-lg">
       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((review) => (
                <div 
                    key={review._id} 
                    className="p-4 bg-gray-100 shadow-sm rounded-md border border-gray-200">
                    <h2 className=" font-semibold">Product ID: {review.productId}</h2>
                    <p className="text-lg font-semibold">Comment: <span className="font-medium">{review.comment}</span></p>
                    <p className="text-gray-700">Rating: <span className="font-medium text-yellow-500">{review.rating} / 5</span></p>
                    <p className="text-gray-500 text-sm">Reviewed on: {new Date(review.createdAt).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    </div>
    );
};

export default UserReviews;