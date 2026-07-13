import { useState, useEffect } from "react";
import axios from "/src/api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoArrowBack } from "react-icons/io5";
const addProductSchema = z.object({
  productName: z
    .string()
    .trim()
    .min(3, "Product name must be at least 3 characters.")
    .max(150, "Product name is too long."),

  shortDescription: z
    .string()
    .trim()
    .min(10, "Short description must be at least 10 characters.")
    .max(250, "Short description is too long."),

  fullDescription: z
    .string()
    .trim()
    .min(30, "Full description must be at least 30 characters."),

  category: z
    .string()
    .min(1, "Please select a category."),

  subCategory: z.string().optional(),

  brand: z
    .string()
    .trim()
    .min(2, "Brand is required."),

  price: z.coerce
    .number()
    .positive("Price must be greater than zero."),

  discountPrice: z.coerce
    .number()
    .min(0, "Discount price cannot be negative.")
    .optional(),
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
      productName: "",
      shortDescription: "",
      fullDescription: "",
      category: "",
      subCategory: "",
      brand: "",
      price: "",
      discountPrice: "",
      
    },
  });

  // Images
  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Tags
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  // Product Options
  const [featured, setFeatured] = useState(false);
  const [active, setActive] = useState(true);

  // Loading
  const [pageLoading, setPageLoading] = useState(false);
  useEffect(() => {
  const timer = setTimeout(() => {
    setPageLoading(false);
  }, 1200);
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

          <div className="grid gap-6 md:grid-cols-2">
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
  setTags((prev) =>
    prev.filter((tag) => tag !== tagToRemove)
  );
};

  const handleImageUpload = (event) => {
  const files = Array.from(event.target.files);

  const imageObjects = files.map((file) => ({
    id: crypto.randomUUID(),
    file,
    preview: URL.createObjectURL(file),
  }));

  setImages((prev) => [...prev, ...imageObjects]);
};

  const removeImage = (id) => {
  setImages((prev) =>
    prev.filter((image) => image.id !== id)
  );
};

  useEffect(() => {
  return () => {
    images.forEach((image) => {
      URL.revokeObjectURL(image.preview);
    });
  };
}, [images]);

 const onSubmit = async (data) => {
  try {
    const formData = new FormData();

    formData.append("productName", data.productName);
    formData.append("shortDescription", data.shortDescription);
    formData.append("fullDescription", data.fullDescription);

    formData.append("category", data.category);
    formData.append("subCategory", data.subCategory);

    formData.append("brand", data.brand);
    formData.append("sku", data.sku);

    formData.append("price", data.price);
    formData.append("discountPrice", data.discountPrice);

    formData.append("featured", featured);
    formData.append("active", active);

    formData.append("tags", JSON.stringify(tags));

    images.forEach((image) => {
      formData.append("images", image.file);
    });

    await axios.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success("Product added successfully.");

    navigate("/products");
  } catch (error) {
    console.error(error);

    toast.error("Failed to add product.");
  }
};
 return (
  <div className="min-h-screen bg-amazon-bg p-4 md:p-6">
    <div className="mx-auto max-w-7xl">

      {/* ========================= */}
      {/* Page Header */}
      {/* ========================= */}

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

      {/* ========================= */}
      {/* Form */}
      {/* ========================= */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >

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
        htmlFor="productName"
        className="mb-2 block text-sm font-medium text-amazon-textDark"
      >
        Product Name *
      </label>

      <input
        id="productName"
        type="text"
        placeholder="Enter product name"
        {...register("productName")}
        className="w-full rounded-lg border border-amazon-border bg-amazon-surface px-4 py-3 text-amazon-textDark outline-none transition focus:border-amazon-orange"
      />

      {errors.productName && (
        <p className="mt-2 text-sm text-red-500">
          {errors.productName.message}
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
        htmlFor="fullDescription"
        className="mb-2 block text-sm font-medium text-amazon-textDark"
      >
        Full Description
      </label>

      <textarea
        id="fullDescription"
        rows={6}
        placeholder="Enter full description"
        {...register("fullDescription")}
        className="w-full rounded-lg border border-amazon-border bg-amazon-surface px-4 py-3 text-amazon-textDark outline-none transition focus:border-amazon-orange resize-y"
      />

      {errors.fullDescription && (
        <p className="mt-2 text-sm text-red-500">
          {errors.fullDescription.message}
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
        Category *
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

    {/* Sub Category */}
    <div>
      <label
        htmlFor="subCategory"
        className="mb-2 block text-sm font-medium text-amazon-textDark"
      >
        Sub Category
      </label>

      <select
        id="subCategory"
        {...register("subCategory")}
        className="w-full rounded-lg border border-amazon-border bg-amazon-surface px-4 py-3 text-amazon-textDark outline-none transition focus:border-amazon-orange"
      >
        <option value="">Select Sub Category</option>
        <option value="mobile">Mobile Phones</option>
        <option value="laptops">Laptops</option>
        <option value="accessories">Accessories</option>
      </select>
    </div>

    {/* Brand */}
    <div className="md:col-span-2">
      <label
        htmlFor="brand"
        className="mb-2 block text-sm font-medium text-amazon-textDark"
      >
        Brand *
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

  </div>

</section>

        {/* Pricing */}
       {/* Pricing */}
<section className="rounded-xl border border-amazon-border bg-amazon-surface p-6 shadow-sm">

  <div className="mb-6">
    <h2 className="text-xl font-semibold text-amazon-textDark">
      Pricing
    </h2>

    <p className="mt-1 text-sm text-amazon-textLight">
      Configure the product pricing information.
    </p>
  </div>

  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

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
    <div className="mb-4 text-5xl">
      📷
    </div>

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
        onClick={() => setFeatured(!featured)}
        className={`relative h-7 w-14 rounded-full transition ${
          featured
            ? "bg-amazon-orange"
            : "bg-gray-300"
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
        onClick={() => setActive(!active)}
        className={`relative h-7 w-14 rounded-full transition ${
          active
            ? "bg-amazon-orange"
            : "bg-gray-300"
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