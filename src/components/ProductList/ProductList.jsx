import ProductItem from "../ProductItem/ProductItem";

async function getProducts(token) {
  const response = await fetch(
    "https://dev-mrp.insby.tech/api/v2/session/product",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  return data;
}

export const ProductList = async ({ token }) => {
  const products = await getProducts(token);

  return (
    <div className="z-10 px-5 mt-11 max-w-5xl w-full items-center justify-between flex flex-col gap-8  text-sm lg:flex">
      {products?.data.map((item) => {
        return <ProductItem key={item.id} item={item} />;
      })}
    </div>
  );
};

export default ProductList;
