

const UserStats = ({ stats }) => {
    return (
        <div className="my-4 space-y-4">
            {/* Grid for cards */}
            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4 grid-cols-1">
                {/* Card 1: Total Payments */}
                <div className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-600">Total Payments</h2>
                    <p className="mt-2 text-2xl font-bold text-gray-800">${stats?.totalPayments || 0}</p>
                </div>

                {/* Card 2: Total Reviews */}
                <div className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-600">Total Reviews</h2>
                    <p className="mt-2 text-2xl font-bold text-gray-800">{stats?.totalReviews || 0}</p>
                </div>

                {/* Card 3: Total Purchased Orders */}
                <div className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-600">Total Purchased Orders</h2>
                    <p className="mt-2 text-2xl font-bold text-gray-800">{stats?.totalPurchasedProducts || 0}</p>
                </div>
            </div>
        </div>
    );
};

export default UserStats;
