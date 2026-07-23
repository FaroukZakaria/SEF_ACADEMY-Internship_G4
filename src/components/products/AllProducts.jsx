import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QuickEditProduct from "../QuickEditProduct"
import SearchProductBar from "./SearchProductBar"
import { FaBoxOpen } from "react-icons/fa"; 
import ProductStatusCard from "../ProductStatusCard";
import AllProductsSkeleton from "./AllProductsSkeleton"

const AllProducts = () => {
    const [productData, setproductData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quickEditProduct, setQuickEditProduct] = useState(null);
    const [filters, setFilters] = useState({ query: "", category: "", subcategory: "" });

    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
        try {
            const { data } = await api.get("/products");
            setproductData(data);
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
            setLoading(true);
            await api.delete(`/products/${productId}`);
            toast.success("Product removed successfully");
            setproductData((prev) => ({
                ...prev,
                totalProducts: prev.totalProducts - 1,
                products: prev.products.filter((p) => p._id !== productId),
            }));
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to remove product");
        } finally {
        setLoading(false);
    }
    };

    const handleQuickEditSuccess = (updatedProduct) => {
        setproductData((prev) => ({
            ...prev,
            products: prev.products.map((product) => product._id === updatedProduct._id ? updatedProduct : product)
        }))
    } 

    const handleSearch = async (newFilters) => {
    try {
        setLoading(true);
        const { query, category, subcategory } = newFilters;
        const params = new URLSearchParams();
        if (query) 
            params.append("search", query);
        if (category) 
            params.append("category", category);
        if (subcategory) 
            params.append("subcategory", subcategory);
        const { data } = await api.get(`/products/search?${params.toString()}`);
        setproductData(data);
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
}

    return(
        <div>
            <ProductStatusCard productsStatistics={productData} />
            <SearchProductBar filters={filters} onFiltersChange={setFilters} onSearch={handleSearch}/>
            {productData?.products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-7">
                    {productData.products.map((product) => (
                        <ProductCard 
                            key={product._id} product={product} 
                            onView={() => navigate(`/products/${product._id}`)}
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