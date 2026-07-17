
import { useState , useEffect } from "react";
import { useParams , useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";
import { IoArrowBack } from "react-icons/io5";
import { FaEye , FaTag , FaStar , FaBoxOpen } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ProductSkeleton from "../components/ProductSkeleton";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const ViewProduct = () =>{
    const { id } = useParams();
    
    const navigate = useNavigate()

    const [product , setProduct] = useState(null);

    const [activeImage , setActiveImage] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() =>{
        const fetchProduct = async () =>{
            try{
                
                const response = await api.get(`/products/${id}`);
                
                setProduct(response.data.product);
                

            }catch(error){
                toast.error("Failed to load product")
            }
            

        };
        fetchProduct();


    }, [id]);

    if(!product){
        return <ProductSkeleton />;
    }

    return (
        
        <div className=" p-4 lg:p-6 ">

            {/* header */}
            <div className="w-full max-w-5xl rounded-3xl p-5  bg-amazon-navy    ">
                <button onClick={() => navigate(-1)} className="flex mb-4 gap-2 items-center text-white/80 
                    hover:text-white cursor-pointer">
                    <IoArrowBack size={18} />
                        Back
                </button>


            <div class="flex items-center gap-2">
                
                    <FaEye size={25} className="text-white" />
                
                <div>
                <h2 className="text-3xl font-bold text-white pl-4">
                    {product.name}
                </h2>
                
                <p className="mt-2 text-sm text-gray-400 pl-4">
                    Product details overview

                </p>
                </div>
                </div>

                
            </div>
            
            {/* Main */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                


            {/* left */}
            <div className="space-y-4 px-4 lg:px-0">
                <div className="rounded-3xl overflow-hidden bg-amazon-bg shadow">
                    <img
                        src={product.images[activeImage].url}
                        alt={product.name}
                        className="w-full h-72 sm:h-80 md:h-96 lg:h-[450px] object-cover"
                    />
                </div>

                <div className="grid grid-cols-4 gap-2">
                    {product.images.map((image, index) => (
                    <img
                        key={image.public_id}
                        src={image.url}
                        onClick={() => setActiveImage(index)}
                        className={`
                        w-full
                        aspect-square
                        object-cover
                        rounded-lg
                        cursor-pointer
                        border-2
                        ${
                        activeImage === index? "border-amazon-border": "border-transparent"
                        }
                        `}
                        />
                        ))}
                    </div>

                <div className="w-full overflow-hidden rounded-3xl bg-amazon-bg shadow">

                    <Swiper
                        modules={[Navigation, Pagination]}
                        navigation={true}
                        pagination={{ clickable: true }}
                        className="w-full min-w-0 overflow-hidden rounded-3xl"
                    >
                        {product.images.map((image) => (
                        <SwiperSlide key={image.public_id}>
                            <img
                                src={image.url}
                                alt={product.name}
                                className="w-full h-72 sm:h-80 md:h-96 lg:h-[430px] object-cover"
                            />
                        </SwiperSlide>
                        ))}
                    </Swiper>

                </div>
            </div>

            {/* Right */}
            <div className="space-y-6">

                <div className="bg-amazon-surface rounded-3xl p-8 shadow">
                    <p className=" leading-7 text-amazon-orange  uppercase">Overview</p>
                    <h2 className="text-3xl font-bold mt-2 text-amazon-textDark">
                        {product.name}</h2>
                    <p className="text-sm text-amazon-textDark mt-4">{product.description}</p>    

                </div> {/* Overview */}
                

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-amazon-surface p-5 rounded-2xl shadow">
                        <p className="text-xs uppercase text-amazon-orange">Price</p>
                        <h3 className="text-xl font-bold mt-2">${product.price}</h3>
                    </div>  {/* price */}

                    <div className="bg-amazon-surface p-5 rounded-2xl shadow">
                        <p className="text-xs uppercase text-amazon-orange">Discount</p>
                        <h3 className="text-xl font-bold mt-2">
                            {product.discountPrice > 0?
                            `$${product.discountPrice}`: "No Discount"}</h3>
                    </div> {/* Discount */}

                    <div className="bg-amazon-surface p-5 rounded-2xl shadow">
                        <p className="text-xs uppercase text-amazon-orange">Stock</p>
                        <h3 className="text-xl font-bold mt-2">{product.stock > 0 ? product.stock : "Out of Stock"}</h3>
                    </div> {/* Stock */}

                    <div className="bg-amazon-surface p-4 rounded-2xl shadow">
                        <p className="text-xs uppercase text-amazon-orange">SKU</p>
                        <h3 className="text-xl font-bold mt-2">{product.sku}</h3>
                    </div> {/* SKU */}
                </div>
    
                <div className="bg-amazon-surface rounded-3xl p-7 shadow">
                    <h3 className="flex items-center gap-2 font-semibold text-amazon-orange">
                        <FaTag size={18} />
                        Tags

                    </h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {product.tags.map((tag) => (
                            <span key={tag}
                                className="rounded-full px-3 py-1 text-sm text-amazon-textDark bg-amazon-bg "
                            
                            > #{tag}</span>
                        ))}

                    </div>
                </div>  {/* Tags */}


                <div className="p-8 rounded-3xl text-amazon-orange bg-amazon-surface shadow ">
                    <h3 className="flex items-center gap-2 text-lg font-semibold">
                        <FaBoxOpen size={18} />
                        Category Info

                    </h3>
                    <p className="mt-4 text-amazon-textDark">
                        {product.category}

                        {" • "}

                        {product.subcategory}

                        {" • "}

                        {product.brand}

                    </p>
                </div> {/* Category Info */}

                <div className="rounded-3xl p-8 shadow bg-amazon-surface">
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-amazon-orange">
                        <FaStar size={18} />
                        Highlights

                    </h3>
                    <p className="mt-4 text-amazon-textDark  ">
                        {product.shortDescription}

                    </p>

                </div> {/* Highlights */}

                
            </div> {/* Right */}

            </div>

        </div>

    );
};
export default ViewProduct;