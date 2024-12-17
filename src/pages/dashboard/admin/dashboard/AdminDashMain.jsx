import React from 'react';
import { useSelector } from 'react-redux';
import AdminStats from './AdminStats';
import { useGetAdminStatsQuery } from '@/redux/featuresApi/stats/statsApi';
import AdminStatsChart from './AdminStatsChart';

const AdminDashMain = () => {
    const { user } = useSelector((state) => state.auth);

    const { data: adminStats, error, isLoading } = useGetAdminStatsQuery();

 const stats = adminStats || {};
 if(!stats){
    return <h1>no data available</h1>;
 }
    return (
        <div>
             <h2>hello, {user?.name}</h2>

             <div>
                <AdminStats stats={stats}/>
             </div>
             <div>
                <AdminStatsChart stats={stats}/>
             </div>
            
        </div>
    );
};

export default AdminDashMain;