
import { useEffect, useState } from "react";
import { IoPeopleOutline, IoShieldOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import api from "../../api/axios";

export default function UserStatusCard({ refreshTrigger }) {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    admins: 0,
    customers: 0,
    verified: 0,
  });

  const getToastTheme = () =>
    document.documentElement.classList.contains("dark") ? "dark" : "light";

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      try {
        const res = await api.get("/users/all");

        const users = Array.isArray(res.data?.users) ? res.data.users : [];

        setStats({
          total: users.length,
          admins: users.filter((u) => u.role === "admin").length,
          customers: users.filter((u) => u.role === "customer").length,
          verified: users.filter((u) => u.isVerified).length,
        });
      } catch (err) {
        toast.error(
          err.response?.data?.message || "Failed to load users stats.",
          { theme: getToastTheme() }
        );
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [refreshTrigger]);

  const cards = [
    { title: "Total Users", value: stats.total, icon: IoPeopleOutline },
    { title: "Admins", value: stats.admins, icon: IoShieldOutline },
    { title: "Customers", value: stats.customers, icon: IoPeopleOutline },
    { title: "Verified", value: stats.verified, icon: IoCheckmarkCircleOutline },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ title, value, icon: Icon }) => (
        <div
          key={title}
          className="rounded-3xl border border-amazon-border bg-amazon-surface p-6 shadow-lg
                     dark:border-amazon-lightNavy dark:bg-amazon-navy transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              {loading ? (
                <>
                  <div className="h-4 w-24 animate-pulse rounded-md bg-amazon-border dark:bg-amazon-lightNavy" />
                  <div className="mt-3 h-8 w-14 animate-pulse rounded-md bg-amazon-border dark:bg-amazon-lightNavy" />
                </>
              ) : (
                <>
                  <p className="text-sm text-amazon-textLight dark:text-slate-400">{title}</p>
                  <h3 className="mt-2 text-3xl font-bold text-amazon-textDark dark:text-white">
                    {value}
                  </h3>
                </>
              )}
            </div>

            <div
              className={`rounded-2xl bg-amazon-orange p-3 text-white shrink-0 ${
                loading ? "opacity-50" : ""
              }`}
            >
              {loading ? (
                <div className="h-6 w-6 animate-pulse rounded-md bg-white/40" />
              ) : (
                <Icon className="h-6 w-6" />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}