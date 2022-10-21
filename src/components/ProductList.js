import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { filteredProducts: products, gridView } = useFilterContext();
  if (products.length < 1) {
    return <h4>Sorry, no matching products search...</h4>;
  }
  if (gridView) {
    return <GridView products={products} />;
  }
  return <ListView products={products} />;
};

export default ProductList;
