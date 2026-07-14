import { useEffect, useState } from "react";
import api from "../api/axios";
import StatsGridSkeleton from "./StatsGridSkeleton";
import { BsBoxSeam } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa";
import { IoMdTrendingUp } from "react-icons/io";
import { TbHexagons } from "react-icons/tb";
const ProductStatusCard = () => {
  const [productsStatistics, setproductsStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get("/products");
        setproductsStatistics(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <StatsGridSkeleton />;
  }
  const cardStatistics = [
    {
      icon: <BsBoxSeam size={22} className="text-amazon-orange" />,
      value: productsStatistics?.totalProducts,
      title: "total",
      colorbg: "bg-amazon-yellow/20",
      colorborder: "border-amazon-yellow/50",
    },
    {
      icon: <FaRegStar size={22} className="text-cyan-400" />,
      value:
        productsStatistics?.products?.filter((product) => product.featured)
          .length || 0,
      title: "featured",
      colorbg: "bg-cyan-400/20",
      colorborder: "border-cyan-400/50",
    },
    {
      icon: <IoMdTrendingUp size={22} className="text-green-500" />,
      value:
        productsStatistics?.products?.filter((product) => product.stock > 0)
          .length || 0,
      title: "in stock",
      colorbg: "bg-green-500/20",
      colorborder: "border-green-500/50",
    },
    {
      icon: <TbHexagons size={22} className="text-fuchsia-500" />,
      value:
        productsStatistics?.products?.filter((product) => product.stock === 0)
          .length || 0,
      title: "out of stock",
      colorbg: "bg-fuchsia-500/20",
      colorborder: "border-fuchsia-500/50",
    },
  ];
  return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-7">
        {cardStatistics.map((card, index) => (
          <div
            key={index}
            className="w-full rounded-4xl border border-amazon-border bg-amazon-surface p-5"
          >
            <div
              className={`${card.colorbg} border ${card.colorborder} w-12 h-12 rounded-xl flex items-center justify-center`}
            >
              {card.icon}
            </div>
            <h2 className="text-3xl font-semibold mt-3 mb-2 text-amazon-textDark">
              {card.value}
            </h2>
            <p className="text-sm font-medium text-amazon-textLight/60 capitalize">
              {card.title}
            </p>
          </div>
        ))}
      </div>
  );
};
export default ProductStatusCard;
