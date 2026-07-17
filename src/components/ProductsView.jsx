import { BsBoxSeam } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ProductStatusCard from "./ProductStatusCard"


const ProductsView = () => {
  return (
    <div className="px-10 lg:px-17 pt-10">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 border border-amazon-orange/20 shadow bg-linear-to-tr from-amazon-orange/20 to-amazon-yellow/30 p-8 rounded-4xl">
        <div className="flex items-center gap-5">
          <div className="bg-amazon-yellow/50 w-20 h-20 rounded-3xl flex items-center justify-center">
            <BsBoxSeam size={32} className="text-amazon-orange" />
          </div>
          <div className="title">
            <p className="font-light uppercase tracking-[0.3em] text-amazon-orange">
              product dashboard
            </p>
            <p className="text-3xl font-extrabold mt-2 mb-2 capitalize text-amazon-textDark">
              products
            </p>
          </div>
        </div>
        <div className="group w-full lg:w-fit flex items-center gap-2 py-3 px-4 rounded-2xl bg-amazon-orange hover:bg-amazon-orangeHover hover:shadow-md cursor-pointer shadow shadow-amazon-orangeHover ">
          <FaPlus className="transition-transform duration-300 group-hover:rotate-90" />
          <Link
            to="/products/add"
            className="capitalize font-semibold text-amazon-textDark"
          >
            add products
          </Link>
        </div>
      </div>
      <ProductStatusCard />
    </div>
  );
};

export default ProductsView;
