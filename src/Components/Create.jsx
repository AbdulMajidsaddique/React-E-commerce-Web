import React, { useContext, useState } from "react";
import { productContext } from "../Utils/Context";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useContext(productContext);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  // form Reload Handler
  const addProductHandler = (e) => {
    e.preventDefault();
    if (
      title.trim().length < 5 ||
      image.trim().length < 5 ||
      category.trim().length < 5 ||
      price.trim().length < 1 ||
      description.trim().length < 5
    ) {
      alert("Each and every input must be required");
      return;
    }

    const product = {
      id: nanoid(),
      title,
      image,
      category,
      price,
      description,
    };
    setProducts([...products, product]);
    localStorage.setItem("products", JSON.stringify([...products, product]));
    navigate("/");
    toast.success("Product added successfully");
  };
  return (
    <form
      onSubmit={addProductHandler}
      className="flex flex-col items-center p-[8%] w-screen h-screen"
    >
      <h1 className="mb-5 w-1/2 text-3xl">Add New Products</h1>

      <input
        type="text"
        placeholder="Title"
        className="text-1xl bg-zinc-100 rounded p-2 w-1/2 mb-3"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      {/* Image url Input */}
      <input
        type="url"
        placeholder="Image URL"
        className="text-1xl bg-zinc-100 rounded p-2 w-1/2 mb-3"
        onChange={(e) => setImage(e.target.value)}
        value={image}
      />
      {/* category and price */}
      <div className="w-1/2 flex justify-between">
        <input
          type="text"
          placeholder="Category"
          className="text-1xl bg-zinc-100 rounded p-2 w-[49%] mb-3"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />

        <input
          type="number"
          placeholder="Price"
          className="text-1xl bg-zinc-100 rounded p-2 w-[49%] mb-3"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
      </div>
      <textarea
        rows="10"
        className="text-1xl bg-zinc-100 rounded p-2 w-1/2 mb-3"
        placeholder="Enter Product Description Here..."
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      ></textarea>
      <div className="w-1/2">
        <button className="px-5 py-2 border rounded border-blue-300 text-blue-400">
          Add New Product
        </button>
      </div>
    </form>
  );
};

export default Create;
