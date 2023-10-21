import React from "react";
import ProductItem from "../ProductItem/ProductItem";

async function getProducts() {
  const response = await fetch(
    "https://dev-mrp.insby.tech/api/v2/session/product",
    {
      headers: {
        Authorization: `Bearer QTEyOEdDTQ.LVd_DbnkpDQqIPJLoZPsneO9xT-M2Qj324kL1Hl3VvmzKkxzwv78S8hA8i0.D-nNknfEvAaEOsdJ.TIJSWrhtE3tyglNTWotu8AhIkNaOMehj6WQStcmng7nGpjX49NTbMPaVcL8P9pdZ3k6yAdlVylhX0DnlGfHMTKD-zpWhBZZItNOIaEYECB0kkxeZNuPFkPpSzzs7VVMEjIG9cOi9f-299P_qO51RESeF6hserkB0uHVkYYFvHsCBAGcAIGWO.PCiX3nr73aQH10ba9GgBug`,
      },
    }
  );

  const data = await response.json();

  return data;
}

export const ProductList = async () => {
  const products = await getProducts();
  return (
    <div className="z-10 px-5 max-w-5xl w-full items-center justify-between flex flex-col gap-8  text-sm lg:flex">
      {products.data.map((item) => {
        return <ProductItem item={item} />;
      })}
    </div>
  );
};

export default ProductList;
