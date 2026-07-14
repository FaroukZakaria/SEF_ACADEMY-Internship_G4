import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api/axios";

const MAX_IMAGES = 8;

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

const XIcon = (cls) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
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
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between rounded-lg border bg-amazon-bg px-3.5 py-2.5 text-left text-sm outline-none transition-colors ${
          open ? "border-amazon-orange" : error ? "border-red-500" : "border-amazon-border"
        } ${selected?.value ? "text-amazon-text" : "text-amazon-textLight/60"}`}
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
                  : "text-amazon-text hover:bg-amazon-bg"
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

const buildFormData = (data, images, deletedImages) => {
  const fd = new FormData();

  fd.append("name", data.name.trim());
  fd.append("shortDescription", data.shortDescription.trim());
  fd.append("description", data.description.trim());
  fd.append("price", Number(data.price));
  fd.append("stock", Number(data.stock));
  fd.append("sku", data.sku.trim());
  fd.append("category", data.category);
  fd.append("brand", data.brand.trim());
  fd.append("featured", Boolean(data.featured));
  fd.append("isActive", Boolean(data.isActive));

  if (String(data.discountPrice).trim()) fd.append("discountPrice", Number(data.discountPrice));
  if (data.subcategory?.trim()) fd.append("subcategory", data.subcategory.trim());

  const tagsArray = data.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  tagsArray.forEach((tag) => {
    fd.append("tags", tag);
  });

  images.forEach((img) => img.file && fd.append("images", img.file));

  if (deletedImages.length > 0) {
    deletedImages.forEach((id) => fd.append("deletedImages", id));
  }

  return fd;
};

const validateForm = (data, imageCount) => {
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
  if (imageCount === 0) errors.images = "At least one product image is required";

  return errors;
};

export default function QuickEditProduct({ isOpen, onClose, productId = null, initialData = null, onSuccess = () => {} }) {
  const isEditMode = Boolean(productId && productId !== "demo-product-id");

  const [formData, setFormData] = useState(emptyForm);
  const [images, setImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [show, setShow] = useState(false);
  const modalRef = useRef(null);
  const fileInputRef = useRef(null);
  const dragCounter = useRef(0);

  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      setFormData({
        name: initialData.name || "",
        shortDescription: initialData.shortDescription || "",
        description: initialData.description || "",
        price: initialData.price ?? "",
        discountPrice: initialData.discountPrice ?? "",
        stock: initialData.stock ?? "",
        sku: initialData.sku || "",
        brand: initialData.brand || "",
        category: initialData.category || "",
        subcategory: initialData.subcategory || "",
        tags: Array.isArray(initialData.tags) ? initialData.tags.join(", ") : initialData.tags || "",
        featured: Boolean(initialData.featured),
        isActive: initialData.isActive !== undefined ? Boolean(initialData.isActive) : true,
      });

      if (Array.isArray(initialData.images)) {
        setImages(
          initialData.images.map((img, idx) => ({
            id: img.public_id || `existing-${idx}`,
            file: null,
            url: typeof img === "string" ? img : img.url,
            publicId: img.public_id || null,
            isExisting: true,
          }))
        );
      }
      setDeletedImages([]);
    } else {
      setFormData(emptyForm);
      setImages([]);
      setDeletedImages([]);
    }

    setErrors({});
  }, [isOpen, initialData]);

  
  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      
      const raf1 = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => setShow(true));
        return () => cancelAnimationFrame(raf2);
      });
      return () => cancelAnimationFrame(raf1);
    } else {
      setShow(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => e.key === "Escape" && handleRequestClose();
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, isSubmitting]);

  useEffect(() => {
    return () => images.forEach((img) => !img.isExisting && img.url && URL.revokeObjectURL(img.url));
  }, []);

  const handleRequestClose = () => {
    if (isSubmitting) return;
    setIsClosing(true);
    setShow(false);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const handleOverlayMouseDown = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) handleRequestClose();
  };

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
      const slotsLeft = MAX_IMAGES - prev.length;
      const toAdd = incoming.slice(0, Math.max(slotsLeft, 0)).map((file) => ({
        id: `${file.name}-${file.size}-${Date.now()}`,
        file,
        url: URL.createObjectURL(file),
        publicId: null,
        isExisting: false,
      }));
      return [...prev, ...toAdd];
    });

    setErrors((prev) => {
      if (!prev.images) return prev;
      const next = { ...prev };
      delete next.images;
      return next;
    });
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

  const removeImage = (id) => {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target) {
        if (!target.isExisting) {
          URL.revokeObjectURL(target.url);
        } else if (target.publicId) {
          setDeletedImages((old) => [...old, target.publicId]);
        }
      }
      return prev.filter((img) => img.id !== id);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData, images.length);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const payload = buildFormData(formData, images, deletedImages);

      const response = isEditMode
        ? await api.patch(`/products/update/${productId}`, payload, { headers: { "Content-Type": "multipart/form-data" } })
        : await api.post("/products", payload, { headers: { "Content-Type": "multipart/form-data" } });

      toast.success(isEditMode ? "Product updated successfully" : "Product created successfully");
      onSuccess(response.data?.product || response.data);
      handleRequestClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (name) => {
    const field = FIELDS.find((f) => f.name === name);
    const value = formData[name];
    const error = errors[name];
    const type = field.type || "text";
    const base = `w-full rounded-lg border bg-amazon-bg px-3.5 py-2.5 text-sm text-amazon-text placeholder-amazon-textLight/60 outline-none transition-colors focus:border-amazon-orange ${error ? "border-red-500" : "border-amazon-border"}`;

    return (
      <div key={name}>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-amazon-textLight">
          {field.label} {field.required && <span className="text-amazon-orange">*</span>}
        </label>

        {type === "textarea" && (
          <textarea rows={4} value={value} onChange={handleChange(name)} placeholder={field.placeholder} className={`${base} resize-y`} />
        )}

        {type === "select" && (
          <CategorySelect value={value} onChange={(val) => setFieldValue(name, val)} options={field.options} error={error} />
        )}

        {type !== "textarea" && type !== "select" && (
          <input
            type={type}
            step={field.step}
            min={type === "number" ? "0" : undefined}
            value={value}
            onChange={handleChange(name)}
            placeholder={field.placeholder}
            className={base}
          />
        )}

        {error && <p className="mt-1 text-xs font-medium text-red-500">{error}</p>}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 top-16 z-50 flex items-start justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4 sm:p-6 transition-opacity duration-300 ease-out ${
        isClosing || !show ? "opacity-0" : "opacity-100"
      }`}
      onMouseDown={handleOverlayMouseDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-edit-product-title"
    >
      <div
        ref={modalRef}
        className={`w-full max-w-4xl my-4 rounded-xl border border-amazon-border bg-amazon-surface shadow-2xl transition-all duration-300 ease-out ${
          isClosing || !show ? "opacity-0 translate-y-24 scale-95" : "opacity-100 translate-y-0 scale-100"
        }`}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 rounded-t-xl border-b border-amazon-border bg-amazon-surface px-5 py-4 sm:px-6">
          <div className="flex items-start gap-3">
            <span className="mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-amazon-orange" />
            <div>
              <h2 id="quick-edit-product-title" className="text-lg font-bold text-amazon-text sm:text-xl">
                {isEditMode ? "Edit Product" : "Add Product"}
              </h2>
              <p className="mt-1 text-sm text-amazon-textLight">
                {isEditMode ? "Update product details, images and availability." : "Fill in the details below to add a new product."}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRequestClose}
            aria-label="Close"
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-amazon-border text-amazon-textLight transition-colors hover:bg-amazon-bg hover:text-amazon-text"
          >
            {XIcon("h-5 w-5")}
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="max-h-[70vh] overflow-y-auto px-5 py-5 sm:px-6">
            <section className="mb-6">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amazon-navy text-amazon-orange">{ImageIcon("h-5 w-5")}</div>
                  <div>
                    <h3 className="text-sm font-bold text-amazon-text sm:text-base">Product Images</h3>
                  </div>
                </div>
                <span className="flex-shrink-0 rounded-full border border-amazon-border bg-amazon-bg px-3 py-1 text-xs font-semibold text-amazon-textLight">
                  {images.length} / {MAX_IMAGES} selected
                </span>
              </div>

              {images.length > 0 && (
                <div className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {images.map((img) => (
                    <div key={img.id} className="group relative aspect-square overflow-hidden rounded-lg border border-amazon-border bg-amazon-bg">
                      <img src={img.url} alt="Preview" className="h-full w-full object-cover" />
                      <button type="button" onClick={() => removeImage(img.id)} className="absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        {XIcon("h-3.5 w-3.5")}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={(e) => e.preventDefault()}
                className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-8 text-center transition-colors ${isDragging ? "border-amazon-orange bg-amazon-navy/10" : "border-amazon-border bg-amazon-bg hover:border-amazon-orange/60"}`}
              >
                {ImageIcon("mb-2 h-8 w-8 text-amazon-textLight")}
                <p className="text-sm font-semibold text-amazon-text">Click or drag images to upload</p>
                <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileInputChange} />
              </div>
              {errors.images && <p className="mt-2 text-xs font-medium text-red-500">{errors.images}</p>}
            </section>

            <div className="mb-6 h-px w-full bg-amazon-border" />

            <section className="space-y-5">
              {FIELD_ROWS.map((row, idx) => (
                <div key={idx} className={row.length > 1 ? "grid grid-cols-1 gap-5 sm:grid-cols-2" : ""}>
                  {row.map(renderField)}
                </div>
              ))}


              <div className="flex flex-wrap gap-4 pt-1">
                {SWITCHES.map(({ key, label }) => {
                  const checked = formData[key];
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={toggleSwitch(key)}
                      className="flex items-center gap-3 rounded-2xl border border-amazon-orange/60 bg-transparent px-5 py-2.5 text-sm font-semibold text-amazon-orange transition-all outline-none"
                    >
                      
                      <span className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 border-amazon-orange bg-transparent">
                       
                        {checked && (
                          <span className="h-2.5 w-2.5 rounded-full bg-amazon-orange" />
                        )}
                      </span>
                     
                      <span className="text-amazon-orange font-bold text-base tracking-wide">
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          <div className="flex flex-col-reverse gap-3 rounded-b-xl border-t border-amazon-border bg-amazon-surface px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
            <button type="button" onClick={handleRequestClose} disabled={isSubmitting} className="rounded-lg border border-amazon-border bg-amazon-bg px-5 py-2.5 text-sm font-semibold text-amazon-text hover:bg-amazon-border disabled:opacity-50 transition-colors">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex items-center justify-center gap-2 rounded-lg bg-amazon-orange px-5 py-2.5 text-sm font-bold text-amazon-navy hover:bg-amazon-orangeHover disabled:opacity-70 transition-colors">
              {isSubmitting && (
                <svg className="h-4 w-4 animate-spin text-amazon-navy" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
              )}
              {isSubmitting ? "Saving..." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}