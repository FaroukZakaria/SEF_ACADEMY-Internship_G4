import { useState, useEffect } from "react";
import axios from "/src/api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoArrowBack } from "react-icons/io5";

const addProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Product name must be at least 3 characters.")
    .max(150, "Product name is too long."),

  shortDescription: z
    .string()
    .trim()
    .min(10, "Short description must be at least 10 characters.")
    .max(250, "Short description is too long."),

  description: z
    .string()
    .trim()
    .min(30, "Full description must be at least 30 characters."),

  category: z.string().min(1, "Please select a category."),

  subcategory: z.string().optional(),

 brand: z.string().trim().optional(),

sku: z.string().trim().optional(),
  price: z.coerce.number().positive("Price must be greater than zero."),

  discountPrice: z.coerce
    .number()
    .min(0, "Discount price cannot be negative.")
    .optional(),

  stock: z.coerce
    .number()
    .int("Stock must be a whole number.")
    .min(0, "Stock cannot be negative."),
});

const AddProductPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(addProductSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      shortDescription: "",
      description: "",
      category: "",
      subcategory: "",
      brand: "",
      sku: "",
      price: "",
      discountPrice: "",
      stock: "",
    },
  });

  // Images
  const [images, setImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imagesError, setImagesError] = useState("");

  // Tags
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  // Product Options
  const [featured, setFeatured] = useState(false);
  const [active, setActive] = useState(true);

  // Page loading (initial skeleton)
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // -------------------------------
  // Helper Functions
  // -------------------------------

  const addTag = () => {
    const value = tagInput.trim();

    if (!value) return;
    if (tags.includes(value)) return;

    setTags((prev) => [...prev, value]);
    setTagInput("");
  };

  const removeTag = (tagToRemove) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

 const handleImageUpload = (event) => {
  const files = Array.from(event.target.files);

  if (images.length + files.length > 5) {
    setImagesError("You can upload a maximum of 5 images.");
    return;
  }

  const imageObjects = files.map((file) => ({
    id: crypto.randomUUID(),
    file,
    preview: URL.createObjectURL(file),
  }));

  setImages((prev) => [...prev, ...imageObjects]);
  setImagesError("");
};

  const removeImage = (id) => {
    setImages((prev) => prev.filter((image) => image.id !== id));
  };

  useEffect(() => {
    return () => {
      images.forEach((image) => {
        URL.revokeObjectURL(image.preview);
      });
    };
  }, [images]);

 const onSubmit = async (data) => {
  if (images.length === 0) {
    setImagesError("At least one product image is required.");
    return;
  }

  try {
    const formData = new FormData();
      formData.append("name", data.name);
      formData.append("shortDescription", data.shortDescription);
      formData.append("description", data.description);

      formData.append("category", data.category);
      formData.append("subcategory", data.subcategory || "");

      formData.append("brand", data.brand);
      formData.append("sku", data.sku);

      formData.append("price", data.price);
      formData.append("discountPrice", data.discountPrice || 0);
      formData.append("stock", data.stock);

      formData.append("featured", featured);
      formData.append("isActive", active);

      tags.forEach((tag) => {
  formData.append("tags", tag);
});

      images.forEach((image) => {
        formData.append("images", image.file);
      });

      await axios.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percent);
        },
      });

      toast.success("Product added successfully.");
      navigate("/products");
    } catch (error) {
  console.error("Server response:", error?.response?.data);
  toast.error(
    error?.response?.data?.message || "Failed to add product."
  );
}
  };

  // -------------------------------
  // Skeleton (initial page load)
  // -------------------------------
  if (pageLoading) {
    return (
      <div className="min-h-screen bg-amazon-bg p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Header */}
          <div className="space-y-3">
            <div className="h-5 w-40 animate-pulse rounded bg-amazon-border"></div>
            <div className="h-8 w-72 animate-pulse rounded bg-amazon-border"></div>
            <div className="h-4 w-96 animate-pulse rounded bg-amazon-border"></div>
          </div>

          {/* Product Information */}
          <div className="rounded-xl border border-amazon-border bg-amazon-surface p-6 shadow-sm">
            <div className="mb-6 h-6 w-56 animate-pulse rounded bg-amazon-border"></div>
            <div className="space-y-5">
              <div className="h-12 animate-pulse rounded bg-amazon-border"></div>
              <div className="h-24 animate-pulse rounded bg-amazon-border"></div>
              <div className="h-40 animate-pulse rounded bg-amazon-border"></div>
            </div>
          </div>

          {/* Category */}
          <div className="rounded-xl border border-amazon-border bg-amazon-surface p-6 shadow-sm">
            <div className="mb-6 h-6 w-44 animate-pulse rounded bg-amazon-border"></div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="h-12 animate-pulse rounded bg-amazon-border"></div>
              <div className="h-12 animate-pulse rounded bg-amazon-border"></div>
              <div className="h-12 animate-pulse rounded bg-amazon-border md:col-span-2"></div>
            </div>
          </div>

          {/* Pricing */}
          <div className="rounded-xl border border-amazon-border bg-amazon-surface p-6 shadow-sm">
            <div className="mb-6 h-6 w-36 animate-pulse rounded bg-amazon-border"></div>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="h-12 animate-pulse rounded bg-amazon-border"></div>
              <div className="h-12 animate-pulse rounded bg-amazon-border"></div>
              <div className="h-12 animate-pulse rounded bg-amazon-border"></div>
            </div>
          </div>

          {/* Images */}
          <div className="rounded-xl border border-amazon-border bg-amazon-surface p-6 shadow-sm">
            <div className="mb-6 h-6 w-48 animate-pulse rounded bg-amazon-border"></div>
            <div className="h-72 animate-pulse rounded-xl border-2 border-dashed border-amazon-border bg-amazon-bg"></div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------
  // Main Page
  // -------------------------------
  return (
    <div className="min-h-screen bg-amazon-bg p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="mb-3 flex items-center gap-2 text-amazon-orange transition hover:text-amazon-orangeHover"
            >
              <IoArrowBack size={18} />
              Back to Products
            </button>

            <h1 className="text-3xl font-bold text-amazon-textDark">
              Add Product
            </h1>

            <p className="mt-2 text-amazon-textLight">
              Create a new product and publish it to your store.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Product Information */}
          <section className="rounded-xl border border-amazon-border bg-amazon-surface p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-amazon-textDark">
                Product Information
              </h2>
              <p className="mt-1 text-sm text-amazon-textLight">
                Enter the basic information about your product.
              </p>
            </div>

            <div className="space-y-6">
              {/* Product Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-amazon-textDark"
                >
                  Product Name *
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter product name"
                  {...register("name")}
                  className="w-full rounded-lg border border-amazon-border bg-amazon-surface px-4 py-3 text-amazon-textDark outline-none transition focus:border-amazon-orange"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Short Description */}
              <div>
                <label
                  htmlFor="shortDescription"
                  className="mb-2 block text-sm font-medium text-amazon-textDark"
                >
                  Short Description
                </label>
                <textarea
                  id="shortDescription"
                  rows={3}
                  placeholder="Enter short description"
                  {...register("shortDescription")}
                  className="w-full rounded-lg border border-amazon-border bg-amazon-surface px-4 py-3 text-amazon-textDark outline-none transition focus:border-amazon-orange resize-none"
                />
                {errors.shortDescription && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.shortDescription.message}
                  </p>
                )}
              </div>

              {/* Full Description */}
              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-amazon-textDark"
                >
                  Full Description
                </label>
                <textarea
                  id="description"
                  rows={6}
                  placeholder="Enter full description"
                  {...register("description")}
                  className="w-full rounded-lg border border-amazon-border bg-amazon-surface px-4 py-3 text-amazon-textDark outline-none transition focus:border-amazon-orange resize-y"
                />
                {errors.description && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Category & Brand */}
          <section className="rounded-xl border border-amazon-border bg-amazon-surface p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-amazon-textDark">
                Category & Brand
              </h2>
              <p className="mt-1 text-sm text-amazon-textLight">
                Organize your product by category and brand.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-medium text-amazon-textDark"
                >
                  Category 
                </label>
                <select
                  id="category"
                  {...register("category")}
                  className="w-full rounded-lg border border-amazon-border bg-amazon-surface px-4 py-3 text-amazon-textDark outline-none transition focus:border-amazon-orange"
                >
                  <option value="">Select Category</option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="home">Home & Living</option>
                  <option value="beauty">Beauty</option>
                </select>
                {errors.category && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Sub Category — free text, not a select */}
              <div>
                <label
                  htmlFor="subcategory"
                  className="mb-2 block text-sm font-medium text-amazon-textDark"
                >
                  Sub Category
                </label>
                <input
                  id="subcategory"
                  type="text"
                  placeholder="Enter sub category"
                  {...register("subcategory")}
                  className="w-full rounded-lg border border-amazon-border bg-amazon-surface px-4 py-3 text-amazon-textDark outline-none transition focus:border-amazon-orange"
                />
                {errors.subcategory && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.subcategory.message}
                  </p>
                )}
              </div>

              {/* Brand */}
              <div>
                <label
                  htmlFor="brand"
                  className="mb-2 block text-sm font-medium text-amazon-textDark"
                >
                  Brand 
                </label>
                <input
                  id="brand"
                  type="text"
                  placeholder="Enter brand name"
                  {...register("brand")}
                  className="w-full rounded-lg border border-amazon-border bg-amazon-surface px-4 py-3 text-amazon-textDark outline-none transition focus:border-amazon-orange"
                />
                {errors.brand && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.brand.message}
                  </p>
                )}
              </div>

              {/* SKU */}
              <div>
                <label
                  htmlFor="sku"
                  className="mb-2 block text-sm font-medium text-amazon-textDark"
                >
                  SKU *
                </label>
                <input
                  id="sku"
                  type="text"
                  placeholder="e.g. WH-001"
                  {...register("sku")}
                  className="w-full rounded-lg border border-amazon-border bg-amazon-surface px-4 py-3 text-amazon-textDark outline-none transition focus:border-amazon-orange"
                />
                {errors.sku && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.sku.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Pricing & Stock */}
          <section className="rounded-xl border border-amazon-border bg-amazon-surface p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-amazon-textDark">
                Pricing & Stock
              </h2>
              <p className="mt-1 text-sm text-amazon-textLight">
                Configure the product pricing and inventory.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Price */}
              <div>
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-medium text-amazon-textDark"
                >
                  Price *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amazon-textLight">
                    $
                  </span>
                  <input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    {...register("price")}
                    className="w-full rounded-lg border border-amazon-border bg-amazon-surface py-3 pl-10 pr-4 text-amazon-textDark outline-none transition focus:border-amazon-orange"
                  />
                </div>
                {errors.price && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.price.message}
                  </p>
                )}
              </div>

              {/* Discount Price */}
              <div>
                <label
                  htmlFor="discountPrice"
                  className="mb-2 block text-sm font-medium text-amazon-textDark"
                >
                  Discount Price
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amazon-textLight">
                    $
                  </span>
                  <input
                    id="discountPrice"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    {...register("discountPrice")}
                    className="w-full rounded-lg border border-amazon-border bg-amazon-surface py-3 pl-10 pr-4 text-amazon-textDark outline-none transition focus:border-amazon-orange"
                  />
                </div>
                {errors.discountPrice && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.discountPrice.message}
                  </p>
                )}
              </div>

              {/* Stock */}
              <div>
                <label
                  htmlFor="stock"
                  className="mb-2 block text-sm font-medium text-amazon-textDark"
                >
                  Stock Quantity *
                </label>
                <input
                  id="stock"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="0"
                  {...register("stock")}
                  className="w-full rounded-lg border border-amazon-border bg-amazon-surface px-4 py-3 text-amazon-textDark outline-none transition focus:border-amazon-orange"
                />
                {errors.stock && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.stock.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Images */}
          <section className="rounded-xl border border-amazon-border bg-amazon-surface p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-amazon-textDark">
                Product Images
              </h2>
              <p className="mt-1 text-sm text-amazon-textLight">
                Upload one or more product images.
              </p>
            </div>

            <label
              htmlFor="productImages"
              
              className="flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-amazon-border bg-amazon-bg p-8 transition hover:border-amazon-orange"
              
            >
              <div className="mb-4 text-5xl">📷</div>
              <h3 className="text-lg font-semibold text-amazon-textDark">
                Click to Upload Images
              </h3>
              <p className="mt-2 text-sm text-amazon-textLight">
                PNG, JPG, JPEG, WEBP
              </p>
              <input
                id="productImages"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-amazon-border">
                <div
                  className="h-full bg-amazon-orange transition-all"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}

            {images.length > 0 && (
              <div className="mt-8">
                <h3 className="mb-4 text-lg font-semibold text-amazon-textDark">
                  Uploaded Images
                </h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {images.map((image) => (
                    <div
                      key={image.id}
                      className="overflow-hidden rounded-xl border border-amazon-border bg-amazon-surface shadow-sm"
                    >
                      <img
                        src={image.preview}
                        alt={image.file.name}
                        className="aspect-square w-full object-cover"
                      />
                      <div className="p-3">
                        <p className="truncate text-xs text-amazon-textLight">
                          {image.file.name}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeImage(image.id)}
                          className="mt-3 w-full rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Tags */}
          <section className="rounded-xl border border-amazon-border bg-amazon-surface p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-amazon-textDark">
                Tags
              </h2>
              <p className="mt-1 text-sm text-amazon-textLight">
                Add tags to improve product search and organization.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <input
                type="text"
                value={tagInput}
                placeholder="Enter a tag..."
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                className="flex-1 rounded-lg border border-amazon-border bg-amazon-surface px-4 py-3 text-amazon-textDark outline-none transition focus:border-amazon-orange"
              />
              <button
                type="button"
                onClick={addTag}
                className="rounded-lg bg-amazon-orange px-6 py-3 font-semibold text-white transition hover:bg-amazon-orangeHover"
              >
                Add Tag
              </button>
            </div>

            {tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-2 rounded-full bg-amazon-bg px-4 py-2"
                  >
                    <span className="text-sm font-medium text-amazon-textDark">
                      {tag}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="font-bold text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Product Options */}
          <section className="rounded-xl border border-amazon-border bg-amazon-surface p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-amazon-textDark">
                Product Options
              </h2>
              <p className="mt-1 text-sm text-amazon-textLight">
                Configure product visibility and featured status.
              </p>
            </div>

            <div className="space-y-6">
              {/* Featured Product */}
              <div className="flex items-center justify-between rounded-lg border border-amazon-border p-4">
                <div>
                  <h3 className="font-semibold text-amazon-textDark">
                    Featured Product
                  </h3>
                  <p className="text-sm text-amazon-textLight">
                    Show this product in featured products.
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={featured}
                  onClick={() => setFeatured((prev) => !prev)}
                  className={`relative h-7 w-14 rounded-full transition ${
                    featured ? "bg-amazon-orange" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                      featured ? "left-8" : "left-1"
                    }`}
                  />
                </button>
              </div>

              {/* Active Product */}
              <div className="flex items-center justify-between rounded-lg border border-amazon-border p-4">
                <div>
                  <h3 className="font-semibold text-amazon-textDark">
                    Active Product
                  </h3>
                  <p className="text-sm text-amazon-textLight">
                    Enable this product to appear in the store.
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={active}
                  onClick={() => setActive((prev) => !prev)}
                  className={`relative h-7 w-14 rounded-full transition ${
                    active ? "bg-amazon-orange" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                      active ? "left-8" : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="flex flex-col-reverse gap-4 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="rounded-lg border border-amazon-border bg-amazon-surface px-6 py-3 font-medium text-amazon-textDark transition hover:bg-amazon-bg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-amazon-orange px-6 py-3 font-semibold text-white transition hover:bg-amazon-orangeHover disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;