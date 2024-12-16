import { useGetUserStatsQuery } from "@/redux/featuresApi/stats/statsApi";
import Loading from "@/utils/Loading";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { Chart as ChartJS , CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import UserStats from "./UserStats";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const UserDashMain = () => {
    const { user } = useSelector((state) => state.auth);

    const { data: stats, error, isLoading } = useGetUserStatsQuery(user?.email);

    console.log(stats);
    if (isLoading) {
        return <Loading />;
    }

    if (!stats) {
        return (
            <div>
                <h1>no data available</h1>
            </div>
        );
    }

    const data = {
        labels: ["Total Payments", "Total Reviews", "Total Purchased Orders"],
        datasets: [
            {
                label: "User Stats",
                data: [stats?.totalPayments, stats?.totalReviews, stats?.totalPurchasedProducts],
                backgroundColor: ["#ff8a00", "#00ff00", "#0000ff"],
                borderColor: ["#ff8a00", "#00ff00", "#0000ff"],
                borderWidth: 1
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        // if (tooltipItem.label === "Total Payments") {
                        //     return `Total Payments: $${tooltipItem.raw.toFixed(2)}`;
                        // }
                        return `${tooltipItem.label}: ${tooltipItem.raw}`;
                    }
                }

            },
        }
    }

    return (
        <div>
           
            <h2>hello, {user?.name}</h2>


            
            <div>
                <UserStats stats={stats}/>

            </div>

            <div>
                <Bar data={data} options={options} />
            </div>
        </div>
    );

};

export default UserDashMain;
