import { useEffect, useState } from "react";
import api from "../api/axios";
import { LuShoppingBag } from "react-icons/lu";
import { GoClock } from "react-icons/go";
import { MdOutlineAttachMoney } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { BsBoxSeam } from "react-icons/bs";
import { PiUsersThreeLight } from "react-icons/pi";

export default function StatsGrid() {
  const [dashboard, setDashboard] = useState(null);
  const [customers, setCustomers] = useState(null);
  useEffect(() => {
    const getDashboard = async () => {
      try {
        const { data } = await api.get(
          "https://e-commerce-api-3wara.vercel.app/orders/admin/dashboard",
        );
        setDashboard(data.dashboard);
      } catch (error) {
        console.log(error);
      }
    };
    getDashboard();
  }, []);

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const { data } = await api.get(
          "https://e-commerce-api-3wara.vercel.app/users/all",
        );
        const customersCount = data.users.filter(
          (customer) => customer.role === "customer",
        ).length;
        setCustomers(customersCount);
      } catch (error) {
        console.log(error);
      }
    };
    getCustomers();
  }, []);
  const CardsLoop = [
    {
      formColor: "from-orange-500",
      toColor: "to-red-500",
      title: "total orders",
      value: dashboard?.orders?.total,
      info: "All orders received",
      icon: <LuShoppingBag size={24} className="text-white" />,
    },
    {
      formColor: "from-blue-500",
      toColor: "to-cyan-400",
      title: "pending orders",
      value: dashboard?.orders?.pending,
      info: "Awaiting action",
      icon: <GoClock size={24} className="text-white" />,
    },
    {
      formColor: "from-green-500",
      toColor: "to-emerald-400",
      title: "revenue",
      // Don't use:
      // dashboard?.revenue?.total?.toFixed(2) || 0.00
      // because if total is undefined, toFixed() returns undefined
      // and || will display "0" instead of "0.00".
      // Use:
      value: `$${(dashboard?.revenue?.total ?? 0).toFixed(2)}`,
      info: "Total gross revenue",
      icon: <MdOutlineAttachMoney size={24} className="text-white" />,
    },
    {
      formColor: "from-emerald-500",
      toColor: " to-teal-400",
      title: "this month",
      value: `$${(dashboard?.revenue?.thisMonth ?? 0).toFixed(2)}`,
      info: "Monthly sales target",
      icon: <IoCartOutline size={24} className="text-white" />,
    },
    {
      formColor: "from-violet-500",
      toColor: "to-fuchsia-500",
      title: "top product",
      value: dashboard?.topProducts?.[0]?.name,
      info: `${dashboard?.topProducts?.length} sold`,
      icon: <BsBoxSeam size={24} className="text-white" />,
    },
    {
      formColor: "from-amber-500",
      toColor: "to-orange-400",
      title: "users",
      value: customers,
      info: "Registered customers",
      icon: <PiUsersThreeLight size={24} className="text-white" />,
    },
  ];
  return (
    <>
      <div className="p-6 bg-amazon-surface border border-amazon-border rounded-[28px] shadow-sm text-amazon-textDark font-bold">
        <p className="font-light uppercase tracking-[0.3em] text-amazon-orange">
          admin overview
        </p>
        <p className="text-2xl font-bold mt-2 mb-2 text-amazon-textDark">
          Real-time commerce health
        </p>
        <p className="text-amazon-textLight/60">
          Monitor your storefront with AI-style clarity and live API metrics
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {CardsLoop.map((card, index) => (
          <div
            key={index}
            className="relative w-full overflow-hidden rounded-[28px] border border-amazon-border bg-amazon-surface p-5 transition-all duration-300 hover:-translate-y-3 hover:shadow"
          >
            <div
              className={`absolute left-0 top-0 h-1 w-full bg-linear-to-br ${card.formColor} ${card.toColor}`}
            />
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-md font-medium capitalize text-amazon-textLight/60">
                  {card.title}
                </h3>
                <h2 className="text-4xl font-semibold mt-3 mb-2 text-amazon-textDark">
                  {card.value}
                </h2>
                <p className="text-sm font-medium text-amazon-textLight/60">
                  {card.info}
                </p>
              </div>
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-3xl bg-linear-to-br ${card.formColor} ${card.toColor} transition-all duration-300 hover:rotate-12 hover:shadow hover:scale-110`}
              >
                {card.icon}
              </div>
            </div>
            <div className="mt-5 mb-2 h-0.5 w-full bg-linear-to-r from-transparent via-amazon-textLight/40 to-transparent" />
          </div>
        ))}
      </div>
    </>
  );
}
