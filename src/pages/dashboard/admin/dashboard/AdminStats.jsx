const AdminStats = ({ stats }) => {
    return (
      <div className="my-4 space-y-4">
        {/* Grid for cards */}
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5 grid-cols-1">
          {/* Card 1: Total Earnings */}
          <div className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-600">Total Earnings</h2>
            <p className="mt-2 text-2xl font-bold text-gray-800">
              ${stats?.totalEarnings || 0}
            </p>
          </div>
  
          {/* Card 2: Monthly Earnings */}
          {/* <div className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-600">Monthly Earnings</h2>
            <p className="mt-2 text-2xl font-bold text-gray-800">
              ${stats?.monthlyEarnings || 0}
            </p>
          </div> */}
  
          {/* Card 3: Total Orders */}
          <div className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-600">Total Orders</h2>
            <p className="mt-2 text-2xl font-bold text-gray-800">
              {stats?.totalOrders || 0}
            </p>
          </div>
  
          {/* Card 4: Total Products */}
          <div className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-600">Total Products</h2>
            <p className="mt-2 text-2xl font-bold text-gray-800">
              {stats?.totalProducts || 0}
            </p>
          </div>
  
          {/* Card 5: Total Reviews */}
          <div className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-600">Total Reviews</h2>
            <p className="mt-2 text-2xl font-bold text-gray-800">
              {stats?.totalReviews || 0}
            </p>
          </div>
  
          {/* Card 6: Total Users */}
          <div className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-600">Total Users</h2>
            <p className="mt-2 text-2xl font-bold text-gray-800">
              {stats?.totalUsers || 0}
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default AdminStats;
  