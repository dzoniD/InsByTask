import ProductItem from "../ProductItem/ProductItem";
import { getProducts } from "@/utils/fetchHelper";

export const ProductList = async ({ token }) => {
  const products = await getProducts(token);

  return (
    <div className="z-10 px-5 mt-11 mb-11 max-w-5xl w-full items-center justify-between flex flex-col gap-12  text-sm lg:flex">
      {products?.data.map((item) => {
        return <ProductItem key={item.id} item={item} />;
      })}
    </div>
  );
};

export default ProductList;
