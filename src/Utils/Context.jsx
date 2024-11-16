import React, { createContext, useState, useEffect } from "react";
import axios from "../Utils/Axios";

export const productContext = createContext();
const Context = (props) => {
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products")) || null
  );

  // const getProducts = async () => {
  //   try {
  //     const { data } = await axios("/products");
  //     setProducts(data);
  //   } catch {
  //     console.error("Failed to fetch products");
  //   }
  // };
  // useEffect(() => {
  //   getProducts();
  // }, []);
  return (
    <productContext.Provider value={[products, setProducts]}>
      {props.children}
    </productContext.Provider>
  );
};

export default Context;
