import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { FaRegStar, FaRegEye, FaRegEdit, FaRegTrashAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { TbAdjustmentsHorizontal } from "react-icons/tb";

const ProductCard = ({product, onView, onEdit, onQuickEdit, onDelete}) => {
    const [paginationEl, setPaginationEl] = useState(null);
    const [prevEl, setPrevEl] = useState(null);
    const [nextEl, setNextEl] = useState(null);

    return (
        <div className="rounded-4xl hover:shadow-xl transition-all duration-200 border border-amazon-border bg-amazon-surface w-full overflow-hidden">
            <div className="relative group overflow-hidden">
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                    pagination={paginationEl ? { clickable: true, el: paginationEl } : false}
                    navigation={prevEl && nextEl ? { prevEl, nextEl } : false}
                    loop={product.images.length > 1}
                >
                    {product.images.map((img, idx) => (
                        <SwiperSlide key={idx}>
                            <img 
                                src={img.url} 
                                alt={product.name} 
                                className="w-full h-60 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" 
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {product.images.length > 1 && (
                    <>
                        <button
                            ref={setPrevEl}
                            className="absolute left-3 top-1/2 -translate-y-1/2 z-10
                            bg-amazon-surface/90 hover:bg-amazon-surface text-amazon-textDark rounded-full w-8 h-8 
                            flex items-center justify-center shadow-md cursor-pointer
                            opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        >
                            <FaChevronLeft className="text-xs" />
                        </button>
                        <button
                            ref={setNextEl}
                            className="absolute right-3 top-1/2 -translate-y-1/2 z-10
                            bg-amazon-surface/90 hover:bg-amazon-surface text-amazon-textDark rounded-full w-8 h-8 
                            flex items-center justify-center shadow-md cursor-pointer
                            opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        >
                            <FaChevronRight className="text-xs" />
                        </button>

                        <div 
                            ref={setPaginationEl}
                            className="custom-pagination-wrapper absolute bottom-3 left-0 right-0 mx-auto z-10
                            flex items-center justify-center gap-1.5 !w-fit"
                        ></div>
                    </>
                )}

                {product.featured && (
                    <span className="absolute top-3 left-3 bg-amazon-yellow text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 z-10">
                        <FaRegStar/> Featured
                    </span>
                )}
                <span className={`absolute bottom-3 right-3 text-xs font-bold px-3 py-2 rounded-full z-10 backdrop-blur-sm
                ${product.stock > 0 ? "bg-green-700/50 text-green-300" : "bg-red-300/70 text-red-600"}`}>
                {product.stock > 0 ? `${product.stock} in Stock` : "Out of Stock"}
                </span>
            </div>
            <div className="pb-4 overflow-hidden w-9/10 mx-auto">
                <div>
                    <p className="text-lg font-bold mt-4 mb-1">{product.name}</p>
                    <p className="text-xs font-medium text-amazon-textLight/60 uppercase">
                        {product.category}
                        {product.subcategory && ` · ${product.subcategory}`}
                        {product.brand && ` · ${product.brand}`}
                    </p>
                </div>
                <div className="text-xs font-medium text-amazon-textLight/60 my-4">
                    {product.shortDescription}
                </div>
                <div className="mb-4">
                    <span className="text-3xl font-extrabold">${product.price}{" "}</span>
                    {product.discountPrice > 0 && (
                        <span className="text-green-700 font-medium">-${product.discountPrice} off</span>
                    )}
                </div>
                <div className="flex gap-2">{product.tags?.map((tag) => (
                    <div key={tag} className="text-xs font-medium text-white rounded-lg bg-amazon-lightNavy p-1.5">{tag}</div>
                ))}</div>
                <hr className="border-amazon-border/50 my-4"/>
                <div className="text-xs font-medium text-amazon-textDark flex flex-wrap gap-2">
                    <button className="border border-amazon-border bg-amazon-bg/60 rounded-xl py-2 px-3 shrink-0 whitespace-nowrap cursor-pointer hover:bg-amazon-bg
                     flex items-center justify-center gap-1.5" 
                    onClick={() => onView(product._id)}><FaRegEye/> View</button>
                    <button className="border border-amazon-border bg-amazon-bg/60 rounded-xl py-2 px-3 shrink-0 whitespace-nowrap cursor-pointer hover:bg-amazon-bg
                     flex items-center justify-center gap-1.5" 
                    onClick={() => onEdit(product._id)}><FaRegEdit/> Edit</button>
                    <button className="border border-amazon-border bg-amazon-bg/60 rounded-xl py-2 px-3 shrink-0 whitespace-nowrap cursor-pointer hover:bg-amazon-bg
                     flex items-center justify-center gap-1" 
                    onClick={() => onQuickEdit(product._id)}><TbAdjustmentsHorizontal/> Quick Edit</button>
                </div>
                <div className="flex justify-end mt-4">
                    <button className="text-xs font-medium text-red-500 border border-red-300 bg-red-200 rounded-xl
                     py-2 px-3 shrink-0 whitespace-nowrap relative flex justify-center items-center gap-1.5 cursor-pointer hover:bg-red-200" 
                    onClick={() => onDelete(product._id)}><FaRegTrashAlt/> Delete</button>
                </div>
            </div>
        </div>
    );
}
export default ProductCard;