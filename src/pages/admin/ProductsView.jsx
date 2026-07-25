import AddProductSection from "../../components/admin/products/AddProductSection";
import ShowAllProduct from "../../components/admin/products/ShowAllProducts";

const  ProductView=()=> {
  return (
    <div className="px-10 lg:px-17 pt-10">
      <AddProductSection />
      <ShowAllProduct />
    </div>
  );
}
export default ProductView;