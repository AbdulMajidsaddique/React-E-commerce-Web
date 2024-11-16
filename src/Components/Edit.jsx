import React, { useContext, useEffect, useState } from "react";
import { productContext } from "../Utils/Context";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Edit = () => {
  const [products, setProducts] = useContext(productContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({
    title: "",
    image: "",
    category: "",
    price: "",
    description: "",
  });
  const changeHandler = (e) => {
    // console.log(e.target.name, e.target.value);
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    setProduct(products.filter((p) => p.id == id)[0]);
  }, [id]);
  //   console.log(product);
  // form Reload Handler
  const addProductHandler = (e) => {
    e.preventDefault();
    if (
      product.title.trim().length < 5 ||
      product.image.trim().length < 5 ||
      product.category.trim().length < 5 ||
      product.price.trim().length < 1 ||
      product.description.trim().length < 5
    ) {
      alert("Each and every input must be required");
      return;
    }

    const pi = products.findIndex((p) => p.id == id);
    const copyData = [...products];
    copyData[pi] = { ...products[pi], ...product };
    setProducts(copyData);
    localStorage.setItem("products", JSON.stringify(copyData));
    navigate(-1);
    toast.warning("Updated successfully");

  };
  return (
    <form
      onSubmit={addProductHandler}
      className="flex flex-col items-center p-[8%] w-screen h-screen"
    >
      <h1 className="mb-5 w-1/2 text-3xl">Edit Products</h1>

      <input
        type="text"
        placeholder="Title"
        className="text-1xl bg-zinc-100 rounded p-2 w-1/2 mb-3"
        name="title"
        onChange={changeHandler}
        value={product && product.title}
      />
      {/* Image url Input */}
      <input
        type="url"
        placeholder="Image URL"
        className="text-1xl bg-zinc-100 rounded p-2 w-1/2 mb-3"
        name="image"
        onChange={changeHandler}
        value={product && product.image}
      />
      {/* category and price */}
      <div className="w-1/2 flex justify-between">
        <input
          type="text"
          placeholder="Category"
          className="text-1xl bg-zinc-100 rounded p-2 w-[49%] mb-3"
          name="category"
          onChange={changeHandler}
          value={product && product.category}
        />

        <input
          type="number"
          placeholder="Price"
          className="text-1xl bg-zinc-100 rounded p-2 w-[49%] mb-3"
          name="price"
          onChange={changeHandler}
          value={product && product.price}
        />
      </div>
      <textarea
        rows="10"
        className="text-1xl bg-zinc-100 rounded p-2 w-1/2 mb-3"
        placeholder="Enter Product Description Here..."
        name="description"
        onChange={changeHandler}
        value={product && product.description}
      ></textarea>
      <div className="w-1/2">
        <button className="px-5 py-2 border rounded border-blue-300 text-blue-400">
          Update Product
        </button>
      </div>
    </form>
  );
};

export default Edit;
