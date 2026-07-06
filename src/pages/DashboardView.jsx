
import StatsGrid from '../components/StatsGrid'
import RecentOrdersTable from '../components/RecentOrdersTable';
import OrderStatusCard from '../components/OrderStatusCard';
import TopProductsCard from '../components/TopProductsCard';
import DashboardLayout from '../components/DashboardLayout';

export default function DashboardView() {
    return (

        <DashboardLayout>
            <div className='flex flex-col gap-6 p-4 lg:p-8'>

                <div className="space-y-6">
                    <StatsGrid />
                </div>

                <div className=" grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                    <OrderStatusCard />
                    <TopProductsCard />
                </div>


                <div>
                    <RecentOrdersTable />
                </div>
                
            </div>
        </DashboardLayout>
    );
}
