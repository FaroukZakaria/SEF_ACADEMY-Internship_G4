
import StatsGrid from '../components/StatsGrid'
import RecentOrdersTable from '../components/RecentOrdersTable';
import OrderStatusCard from '../components/OrderStatusCard';
import TopProductsCard from '../components/TopProductsCard';
import DashboardLayout from '../components/DashboardLayout';

export default function DashboardView() {
    return (

        <DashboardLayout>
            <div className='flex flex-col gap-6'>

                <div className="space-y-6">
                    <StatsGrid />
                </div>

                <div className=" grid grid-cols-1 md:grid-cols-2">
                    <OrderStatusCard />
                    <TopProductsCard />
                </div>

t
                <div>
                    <RecentOrdersTable />
                </div>
                
            </div>
        </DashboardLayout>
    );
}
