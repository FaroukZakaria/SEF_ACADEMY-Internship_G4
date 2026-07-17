import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api/axios";

import EditProductSkeleton from "./EditProductSkeleton";

const CATEGORY_OPTIONS = [
  { value: "", label: "Select category" },
  { value: "electronics", label: "Electronics" },
  { value: "fashion", label: "Fashion" },
  { value: "home", label: "Home & Kitchen" },
  { value: "beauty", label: "Beauty & Personal Care" },
  { value: "sports", label: "Sports & Outdoors" },
  { value: "toys", label: "Toys & Games" },
  { value: "books", label: "Books" },
  { value: "other", label: "Other" },
];

const FIELDS = [
  { name: "name", label: "Product Name", required: true, placeholder: "e.g. Wireless Bluetooth Headphones" },
  { name: "shortDescription", label: "Short Description", required: true, placeholder: "A one-line summary shown in listings" },
  { name: "description", label: "Description", required: true, type: "textarea", placeholder: "Full product description" },
  { name: "price", label: "Price", required: true, type: "number", step: "0.01", placeholder: "0.00" },
  { name: "discountPrice", label: "Discount Price", type: "number", step: "0.01", placeholder: "0.00" },
  { name: "stock", label: "Stock", required: true, type: "number", step: "1", placeholder: "0" },
  { name: "sku", label: "SKU", required: true, placeholder: "e.g. SKU-00123" },
  { name: "brand", label: "Brand", required: true, placeholder: "e.g. Anker" },
  { name: "category", label: "Category", required: true, type: "select", options: CATEGORY_OPTIONS },
  { name: "subcategory", label: "Subcategory", placeholder: "e.g. Over-ear headphones" },
  { name: "tags", label: "Tags", placeholder: "comma, separated, tags" },
];

const FIELD_ROWS = [
  ["name"],
  ["shortDescription"],
  ["description"],
  ["price", "discountPrice"],
  ["stock", "sku"],
  ["brand", "category"],
  ["subcategory", "tags"],
];

const SWITCHES = [
  { key: "featured", label: "Featured" },
  { key: "isActive", label: "Active" },
];

const emptyForm = {
  name: "",
  shortDescription: "",
  description: "",
  price: "",
  discountPrice: "",
  stock: "",
  sku: "",
  brand: "",
  category: "",
  subcategory: "",
  tags: "",
  featured: false,
  isActive: true,
};

// ==========================================
// Icons
// ==========================================
const TrashIcon = (cls) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}>
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);
const ImageIcon = (cls) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="M21 15l-5-5L5 21" />
    <path d="M17 3v6" />
    <path d="M14 6h6" />
  </svg>
);
const ChevronIcon = (cls) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const ArrowLeftIcon = (cls) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}>
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);
const InfoIcon = (cls) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);
const PackageIcon = (cls) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
);

// ==========================================
// Custom Category Select
// ==========================================
function CategorySelect({ value, onChange, options, error }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((opt) => opt.value === value);
  return (
    <div ref={wrapperRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between rounded-lg border bg-amazon-bg px-3.5 py-2.5 text-left text-sm outline-none transition-colors ${
          open ? "border-amazon-orange" : error ? "border-red-500" : "border-amazon-border"
        } ${selected?.value ? "text-amazon-textDark" : "text-amazon-textLight/60"}`}
      >
        {selected ? selected.label : "Select category"}
        {ChevronIcon(`h-4 w-4 text-amazon-textLight transition-transform ${open ? "rotate-180" : ""}`)}
      </button>

      {open && (
        <div className="absolute z-20 mt-1.5 max-h-56 w-full overflow-y-auto rounded-lg border border-amazon-border bg-amazon-surface shadow-lg">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`block w-full px-3.5 py-2 text-left text-sm transition-colors outline-none ${
                opt.value === value
                  ? "bg-amazon-navy text-amazon-orange font-medium"
                  : "text-amazon-textDark hover:bg-amazon-bg"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// Helpers
// ==========================================
const validateForm = (data) => {
  const errors = {};
  if (!data.name.trim()) errors.name = "Product name is required";
  if (!data.shortDescription.trim()) errors.shortDescription = "Short description is required";
  if (!data.description.trim()) errors.description = "Description is required";
  if (!String(data.price).trim()) errors.price = "Price is required";
  else if (isNaN(data.price) || Number(data.price) < 0) errors.price = "Price must be a valid number";
  if (String(data.discountPrice).trim() && (isNaN(data.discountPrice) || Number(data.discountPrice) < 0)) {
    errors.discountPrice = "Discount price must be a valid number";
  }
  if (!String(data.stock).trim()) errors.stock = "Stock is required";
  else if (!Number.isInteger(Number(data.stock)) || Number(data.stock) < 0) errors.stock = "Stock must be a valid whole number";
  if (!data.sku.trim()) errors.sku = "SKU is required";
  if (!data.brand.trim()) errors.brand = "Brand is required";
  if (!data.category.trim()) errors.category = "Category is required";
  return errors;
};

// ==========================================
// Main Page Component
// ==========================================
export default function EditProductView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState(emptyForm);
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const fileInputRef = useRef(null);
  const dragCounter = useRef(0);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        const product = data.product || data;
        
        setFormData({
          name: product.name || "",
          shortDescription: product.shortDescription || "",
          description: product.description || "",
          price: product.price ?? "",
          discountPrice: product.discountPrice ?? "",
          stock: product.stock ?? "",
          sku: product.sku || "",
          brand: product.brand || "",
          category: product.category || "",
          subcategory: product.subcategory || "",
          tags: Array.isArray(product.tags) ? product.tags.join(", ") : product.tags || "",
          featured: Boolean(product.featured),
          isActive: product.isActive !== undefined ? Boolean(product.isActive) : true,
        });

        if (Array.isArray(product.images)) {
          setImages(
            product.images.map((img, idx) => ({
              id: img._id || img.public_id || `existing-${idx}`,
              file: null,
              url: typeof img === "string" ? img : img.url,
              publicId: img.public_id || null,
              dbId: img._id || null, // 👈 التقاط الـ ID الحقيقي من قاعدة البيانات
              isExisting: true,
              isMarkedForRemoval: false, 
            }))
          );
        } else if (product.imageCover) {
           setImages([{
              id: `existing-cover`,
              file: null,
              url: product.imageCover,
              publicId: null,
              dbId: null,
              isExisting: true,
              isMarkedForRemoval: false,
           }]);
        }
      } catch (error) {
        toast.error("Error fetching product details");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchProductDetails();
  }, [id]);

  useEffect(() => {
    return () => images.forEach((img) => !img.isExisting && img.url && URL.revokeObjectURL(img.url));
  }, []);

  const setFieldValue = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleChange = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFieldValue(field, value);
  };

  const toggleSwitch = (field) => () => setFormData((prev) => ({ ...prev, [field]: !prev[field] }));

  const addFiles = (fileList) => {
    const incoming = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (!incoming.length) return;

    setImages((prev) => {
      const toAdd = incoming.map((file) => ({
        id: `${file.name}-${file.size}-${Date.now()}`,
        file,
        url: URL.createObjectURL(file),
        publicId: null,
        dbId: null,
        isExisting: false,
        isMarkedForRemoval: false,
      }));
      return [...prev, ...toAdd];
    });
    setGlobalError("");
  };

  const handleFileInputChange = (e) => {
    if (e.target.files.length) addFiles(e.target.files);
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current = 0;
    setIsDragging(false);
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current += 1;
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current <= 0) {
      dragCounter.current = 0;
      setIsDragging(false);
    }
  };

  const toggleMarkImage = (imgId) => {
    setImages((prev) => prev.map(img => {
      if (img.id === imgId) {
        return { ...img, isMarkedForRemoval: !img.isMarkedForRemoval };
      }
      return img;
    }));
    setGlobalError(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalError("");

    const activeImages = images.filter(img => !img.isMarkedForRemoval);
    const validationErrors = validateForm(formData);
    
    if (activeImages.length === 0) {
      setGlobalError("Product validation failed: images: Product must contain at least one image");
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = new FormData();
      
     

      payload.append("name", formData.name.trim());
      payload.append("shortDescription", formData.shortDescription.trim());
      payload.append("description", formData.description.trim());
      payload.append("price", Number(formData.price));
      payload.append("stock", Number(formData.stock));
      payload.append("sku", formData.sku.trim());
      payload.append("category", formData.category);
      payload.append("brand", formData.brand.trim());
      payload.append("featured", Boolean(formData.featured));
      payload.append("isActive", Boolean(formData.isActive));

      if (String(formData.discountPrice).trim()) payload.append("discountPrice", Number(formData.discountPrice));
      if (formData.subcategory?.trim()) payload.append("subcategory", formData.subcategory.trim());

      const tagsArray = formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean);
      tagsArray.forEach((tag) => payload.append("tags", tag));

      activeImages.forEach((img) => {
        if (!img.isExisting && img.file) {
          payload.append("images", img.file);
        }
      });

      // 👈 تم إصلاح مشكلة حذف الصور (تصفية كلمة "undefined")
      const imagesToDelete = images.filter(img => img.isMarkedForRemoval && img.isExisting);
      imagesToDelete.forEach((img) => {
        const idToDelete = img.dbId || img.publicId;
        if (idToDelete && idToDelete !== "undefined" && idToDelete !== "null") {
          payload.append("deletedImages", idToDelete);
        }
      });

      // 👈 تم إزالة الهيدرز اليدوية ليقوم Axios بإنشاء الـ boundary بنفسه
      await api.patch(`/products/update/${id}`, payload); 
      
      toast.success("Product updated successfully!");
      navigate("/dashboard/products");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to save product";
      setGlobalError(errorMsg);
      toast.error(errorMsg);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (name) => {
    const field = FIELDS.find((f) => f.name === name);
    const value = formData[name];
    const error = errors[name];
    const type = field.type || "text";
    const base = `w-full rounded-lg border bg-amazon-bg px-3.5 py-2.5 text-sm text-amazon-textDark placeholder-amazon-textLight/60 outline-none transition-colors focus:border-amazon-orange ${error ? "border-red-500" : "border-amazon-border"}`;

    return (
      <div key={name} className="w-full">
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-amazon-textLight">
          {field.label} {field.required && <span className="text-amazon-orange">*</span>}
        </label>
        {type === "textarea" && <textarea rows={4} value={value} onChange={handleChange(name)} placeholder={field.placeholder} className={`${base} resize-y`} />}
        {type === "select" && <CategorySelect value={value} onChange={(val) => setFieldValue(name, val)} options={field.options} error={error} />}
        {type !== "textarea" && type !== "select" && <input type={type} step={field.step} min={type === "number" ? "0" : undefined} value={value} onChange={handleChange(name)} placeholder={field.placeholder} className={base} />}
        {error && <p className="mt-1 text-xs font-medium text-red-500">{error}</p>}
      </div>
    );
  };

  if (isLoading) return <EditProductSkeleton />;

  return (
    <div className="p-4 sm:p-6 w-full text-amazon-textDark transition-colors duration-300">
      
      {/* Header Area */}
      <div className="bg-amazon-surface rounded-[1.5rem] border border-amazon-border p-6 sm:p-8 mb-6 shadow-sm flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 w-full">
          <Link to="/dashboard/products" className="inline-flex items-center gap-2 text-xs font-medium text-amazon-textLight bg-amazon-bg/50 border border-amazon-border px-4 py-2 rounded-full hover:bg-amazon-bg hover:text-amazon-textDark transition-colors mb-6">
            {ArrowLeftIcon("w-4 h-4")} Back to products
          </Link>
          
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1rem] bg-[#3b3559]/30 text-[#8b7ff9] border border-[#3b3559]/50 shadow-inner">
              {PackageIcon("h-6 w-6")}
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.25em] text-[#8b7ff9] uppercase mb-1.5">Edit Product</p>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-amazon-textDark tracking-tight mb-2">
                Update and refine the product entry
              </h1>
              <p className="text-sm text-amazon-textLight max-w-2xl leading-relaxed">
                Review the current product data, add new images, remove existing ones, and save your updates safely.
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full xl:w-auto shrink-0 flex items-center xl:justify-end">
          <div className="bg-amazon-bg/30 border border-amazon-border rounded-2xl p-5 w-full xl:w-[280px]">
            <p className="text-[11px] font-bold tracking-widest text-amazon-textLight uppercase mb-2">Live</p>
            <p className="text-sm font-medium text-amazon-textDark leading-snug">
              Connected to the real product update API.
            </p>
          </div>
        </div>
      </div>

      {globalError && (
        <div className="mb-6 rounded-xl border border-[#4a1c28] bg-[#2a111a] p-4 text-[#ffb3c6] shadow-sm flex items-center">
          <span className="text-sm font-medium">{globalError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Gallery & Upload */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-amazon-surface rounded-2xl border border-amazon-border p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3 border-b border-amazon-border pb-4">
              <h2 className="text-base font-bold text-amazon-textDark flex items-center gap-2">
                {ImageIcon("w-5 h-5 text-amazon-orange")} Product Gallery
              </h2>
            </div>

            <p className="text-xs text-amazon-textLight mb-6">Keep existing images, add new ones, or remove selected assets before saving.</p>

            {/* Images Grid */}
            {images.length > 0 && (
              <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {images.map((img, index) => (
                  <div key={img.id} className={`relative flex flex-col overflow-hidden rounded-[1.5rem] border shadow-sm h-64 w-full transition-all duration-300 ${img.isMarkedForRemoval ? 'border-red-900/50 bg-[#160b11]' : 'border-amazon-border bg-amazon-surface'}`}>
                    
                    <div className="relative flex-1 bg-amazon-bg flex items-center justify-center overflow-hidden">
                      <div className={`absolute top-4 left-4 w-2 h-2 rounded-full z-10 shadow-sm transition-colors ${img.isMarkedForRemoval ? 'bg-red-500' : 'bg-[#9b66c8]'}`}></div>
                      
                      <button 
                        type="button" 
                        onClick={() => toggleMarkImage(img.id)} 
                        className={`absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors z-10 shadow-lg ${img.isMarkedForRemoval ? 'bg-[#ff4d4d] hover:bg-red-600' : 'bg-[#4a4a4a] hover:bg-red-500'}`}
                      >
                        {TrashIcon("h-4 w-4")}
                      </button>

                      <img src={img.url} alt="Preview" className={`absolute inset-0 h-full w-full object-cover transition-all duration-300 ${img.isMarkedForRemoval ? 'opacity-30 grayscale blur-[1px]' : ''}`} />
                    </div>

                    <div className={`px-5 py-3.5 border-t transition-colors duration-300 ${img.isMarkedForRemoval ? 'bg-[#0b0508] border-red-900/30' : 'bg-[#0b111e] border-gray-800'}`}>
                      <span className={`text-[11px] font-bold tracking-[0.25em] uppercase ${img.isMarkedForRemoval ? 'text-red-400' : 'text-[#e2e8f0]'}`}>
                        {img.isMarkedForRemoval ? 'MARKED TO REMOVE' : `IMAGE ${index + 1}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={(e) => e.preventDefault()}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-8 text-center transition-colors ${
                isDragging ? "border-amazon-orange bg-amazon-navy/10" : "border-amazon-border bg-amazon-bg hover:border-amazon-orange/60"
              }`}
            >
              {ImageIcon("mb-2 h-8 w-8 text-amazon-textLight")}
              <span className="text-sm font-semibold text-amazon-textDark">Add more images</span>
              <span className="text-[10px] text-amazon-textLight mt-1">PNG, JPG, WEBP - multiple files supported</span>
              <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileInputChange} />
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-emerald-400/20 bg-emerald-500/5 p-4 text-sm text-emerald-100">
            <div className="flex items-center gap-2 font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles h-4 w-4">
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                <path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path>
              </svg> 
              Senior UX
            </div>
            <p className="mt-1 text-emerald-100/90">Edit without losing the existing product story, while still adding fresh media.</p>
          </div>
        </div>

        {/* RIGHT COLUMN: Product Details Form */}
        <div className="lg:col-span-7 bg-amazon-surface rounded-2xl border border-amazon-border p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-5">
            {FIELD_ROWS.map((row, idx) => (
              <div key={idx} className={row.length > 1 ? "grid grid-cols-1 gap-5 sm:grid-cols-2" : ""}>
                {row.map(renderField)}
              </div>
            ))}

            <div className="flex flex-wrap gap-4 pt-2">
              {SWITCHES.map(({ key, label }) => {
                const checked = formData[key];
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={toggleSwitch(key)}
                    className="flex items-center gap-3 rounded-xl border border-amazon-orange/40 bg-amazon-bg px-5 py-2.5 text-sm font-semibold text-amazon-orange transition-all outline-none hover:bg-amazon-orange/10"
                  >
                    <span className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 border-amazon-orange bg-transparent">
                      {checked && <span className="h-2.5 w-2.5 rounded-full bg-amazon-orange" />}
                    </span>
                    <span className="text-amazon-orange font-bold text-sm tracking-wide">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-6 mt-6 border-t border-amazon-border">
            <Link to="/dashboard/products" className="px-5 py-2.5 bg-amazon-bg text-amazon-textDark hover:opacity-80 border border-amazon-border rounded-lg text-sm font-semibold transition-colors">
              Cancel
            </Link>
            <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 bg-amazon-orange hover:bg-amazon-orangeHover text-amazon-navy rounded-lg text-sm font-bold transition-colors disabled:opacity-70 flex items-center gap-2 shadow-sm">
              {isSubmitting && (
                <svg className="h-4 w-4 animate-spin text-amazon-navy" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
              )}
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}