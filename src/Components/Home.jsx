import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { useContext, useEffect, useState } from "react";
import { productContext } from "../Utils/Context";
import Loading from "./Loading";
import axios from "../Utils/Axios";

const Home = () => {
  const [products] = useContext(productContext);
  // console.log(products);

  const { search } = useLocation();
  const category = decodeURIComponent(search.split("=")[1]);
  // console.log(category);

  const [filteredProducts, setFilteredProducts] = useState(null);

  const getProductsCategory = async () => {
    try {
      const { data } = await axios.get(`/products/category/${category}`);
      setFilteredProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (category != "undefined") {
      //getProductsCategory();
      setFilteredProducts(products.filter((p) => p.category == category));
    }
    if (!filteredProducts || category == "undefined")
      setFilteredProducts(products);
  }, [category, products]);
  // console.log(filteredProducts);
  return products ? (
    <>
      <Navbar />

      <div className=" w-[80%] p-10 pt-[4%] flex flex-wrap overflow-x-hidden overflow-y-auto ">
        {filteredProducts &&
          filteredProducts.map((product, index) => {
            return (
              <Link
                key={index}
                to={`/details/${product.id}`}
                className="mr-2 mb-3 card p-5 shadow border rounded w-[19%] h-[32vh] flex flex-col justify-center items-center"
              >
                <div
                  className="hover:scale-110 mb-3 w-full h-[80%] bg-contain bg-no-repeat bg-center "
                  style={{
                    backgroundImage: `url(${product.image})`,
                  }}
                ></div>
                <h1 className="hover:text-blue-300 text-sm">{product.title}</h1>
              </Link>
            );
          })}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
