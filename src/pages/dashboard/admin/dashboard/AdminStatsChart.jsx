import { Pie, Line } from "react-chartjs-2";
import "chart.js/auto";

const AdminStatsChart = ({ stats }) => {
  const pieData = {
    labels: ["Total Orders", "Total Products", "Total Reviews", "All Users"],
    datasets: [
      {
        label: "Admin Stats",
        data: [
          stats?.totalOrders,
          stats?.totalProducts,
          stats?.totalReviews,
          stats?.totalUsers,
        ],
        backgroundColor: ["#ff8a00", "#00ff00", "#0000ff", "#ff00ff"],
        borderColor: ["#ff8a00", "#00ff00", "#0000ff", "#ff00ff"],
        borderWidth: 1,
      },
    ],
  };

  //line charts data

  //   const data = new Array(12).fill(0);
  //   stats?.monthlyEarnings.forEach(entry=>{
  //     data[entry.month-1] = entry.earnings
  //   })

  const data = new Array(12).fill(0);
  if (stats?.monthlyEarnings) {
    stats.monthlyEarnings.forEach((entry) => {
      data[entry.month - 1] = entry.earnings;
    });
  }

  const lineData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Monthly Earnings",
        data: data,
        backgroundColor: "#ff8a00",
        borderColor: "#ff8a00",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div>
      <h1>Admin overview</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="max-w-2xl md:h-96 w-full">
          <Pie data={pieData} options={options} />
        </div>

        <div>
          <Line data={lineData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default AdminStatsChart;
