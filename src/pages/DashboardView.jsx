
import StatsGrid from '../components/StatsGrid'
import RecentOrdersTable from '../components/RecentOrdersTable';
// import OrderStatusCard from '../components/OrderStatusCard';
import TopProductsCard from '../components/TopProductsCard';


export default function DashboardView() {
    return (
        
            <div className='flex flex-col gap-6 p-4 lg:p-8 w-full h-auto'>

                <div className="space-y-6 w-full h-auto">
                    <StatsGrid />
                </div>

                <div className=" grid gap-4 xl:grid-cols-[1.1fr_0.9fr] w-full h-auto">
                    {/* <OrderStatusCard /> */}
                    <TopProductsCard />
                </div>


                <div className='w-full h-auto'>
                    <RecentOrdersTable />
                </div>
                
            </div>        
    );
}
