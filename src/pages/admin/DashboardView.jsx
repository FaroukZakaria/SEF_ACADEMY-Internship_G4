import StatsGrid from "../../components/admin/dashboard/StatsGrid";
import OrderStatusCard from "../../components/admin/dashboard/OrderStatusCard";
import TopProductsCard from "../../components/admin/dashboard/TopProductsCard";
import RecentOrdersTable from "../../components/admin/dashboard/RecentOrdersTable";

const DashboardView =()=> {
  return (
    <div className="flex flex-col gap-6 p-4 lg:p-8 w-full h-auto">
      <div className="space-y-6 w-full h-auto">
        <StatsGrid />
      </div>
      <div className=" grid gap-4 xl:grid-cols-[1.1fr_0.9fr] w-full h-auto">
        <OrderStatusCard />
        <TopProductsCard />
      </div>
      <div className="w-full h-auto">
        <RecentOrdersTable />
      </div>
    </div>
  );
}
export default DashboardView;