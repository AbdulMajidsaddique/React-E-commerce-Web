import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Loading from "./Loading";
import { productContext } from "../Utils/Context";
import { toast } from "react-toastify";

const Details = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useContext(productContext);
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  // const singleData = async () => {
  //   try {
  //     const { data } = await axios.get(/products/${id});
  //     setProducts(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    // singleData();
    if (products && products.length > 0) {
      const foundProduct = products.find((p) => String(p.id) === String(id));
      setProduct(foundProduct || null);
    }
  }, [id, products]);

  if (!products) {
    return <Loading />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const productDeleteHandler = (id) => {
    const filteredProducts = products.filter((p) => p.id !== id);
    setProducts(filteredProducts);
    localStorage.setItem("products", JSON.stringify(filteredProducts));
    navigate("/");
    toast.error("Product Deleted");
  };
  return (
    <div className="w-[80%] justify-between items-center h-full m-auto p-[10%] flex">
      <img
        className="mr-10 object-contain w-[40%] h-[80%]"
        src={product.image}
        alt={product.title}
      />
      <div className="content w-[50%]">
        <h1 className="text-4xl">{product.title}</h1>
        <h3 className="text-zinc-400 my-5">{product.category}</h3>
        <h2 className="text-red-300 mb-3">$ {product.price}</h2>
        <p className="mb-[5%]">{product.description}</p>
        <Link
          to={`/edit/${product.id}`}
          className="mr-5 px-5 py-2 border rounded border-blue-300 text-blue-400"
        >
          Edit
        </Link>
        <button
          onClick={() => productDeleteHandler(product.id)}
          className="px-5 py-2 border rounded border-red-300 text-red-400"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Details;
