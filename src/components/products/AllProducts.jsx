import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QuickEditProduct from "../QuickEditProduct"
import SearchProductBar from "./SearchProductBar"
import { FaBoxOpen } from "react-icons/fa"; 
import AllProductsSkeleton from "./AllProductsSkeleton"

const AllProducts = () => {
    const [productCards, setproductCards] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quickEditProduct, setQuickEditProduct] = useState(null);

    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
        try {
            const { data } = await api.get("/products");
            setproductCards(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
        };
        fetchData();
    }, []);

    if (loading) {
        return <AllProductsSkeleton />;
    }

    const handleDelete = async (productId) => {
        const confirmed = confirm("Delete this product?");
        if (!confirmed) return;

        try {
            await api.delete(`/products/${productId}`);
            toast.success("Product removed successfully");
            setproductCards((prev) => ({
                ...prev,
                products: prev.products.filter((p) => p._id !== productId),
            }));
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to remove product");
        }
    };

    const handleQuickEditSuccess = (updatedProduct) => {
        setproductCards((prev) => ({
            ...prev,
            products: prev.products.map((product) => product._id === updatedProduct._id ? updatedProduct : product)
        }))
    } 

    const handleSearch = async ({ query, category, subcategory }) => {
    try {
        const params = new URLSearchParams();
        if (query) 
            params.append("search", query);
        if (category) 
            params.append("category", category);
        if (subcategory) 
            params.append("subcategory", subcategory);
        const { data } = await api.get(`/products/search?${params.toString()}`);
        setproductCards(data);
    } catch (error) {
        console.log(error);
    }
}

    return(
        <div>
            <SearchProductBar onSearch={handleSearch}/>
            {productCards?.products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-10 lg:px-17 mt-7">
                    {productCards.products.map((product) => (
                        <ProductCard 
                            key={product._id} product={product} 
                            onView={() => navigate(`/products/view/${product._id}`)}
                            onEdit={() => navigate(`/products/edit/${product._id}`)}
                            onQuickEdit={() => setQuickEditProduct(product)}
                            onDelete={() => handleDelete(product._id)}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center text-center py-20 bg-amazon-surface rounded-3xl w-86/100 mx-auto">
                    <FaBoxOpen className="text-5xl text-amazon-textLight/40 mb-3"/>
                    <p className="text-lg font-semibold text-amazon-textLight">No products found</p>
                    <p className="text-sm text-amazon-textLight mt-1">Try adjusting your search or filters.</p>
                </div>
            )}
            <QuickEditProduct 
                isOpen={Boolean(quickEditProduct)} 
                onClose={() => setQuickEditProduct(null)}
                productId = {quickEditProduct?._id}
                initialData = {quickEditProduct}
                onSuccess = {handleQuickEditSuccess}
            />
        </div>
    );
}
export default AllProducts;