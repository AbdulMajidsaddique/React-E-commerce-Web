import { useContext } from "react";
import { productContext } from "../Utils/Context";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [products] = useContext(productContext);

  let distinct_category =
    products && products.reduce((acc, cv) => [...acc, cv.category], []);
  distinct_category = [...new Set(distinct_category)];
  // console.log(distinct_category);

  const color = () => {
    return `rgba(${(Math.random() * 255).toFixed()}, ${(Math.random() * 255).toFixed()}, ${(Math.random() * 255).toFixed()}, 0.4)`;
  };
  // console.log(color())

  return (
    <nav className="w-[20%] h-full bg-zinc-100 flex flex-col items-center pt-5">
      <a
        className="px-5 py-2 border rounded border-blue-300 text-blue-400"
        href="/create"
      >
        Add New Product
      </a>
      <hr className="border-gray-400 my-3 w-[80%]" />
      <h1 className="text-2xl w-[80%] mb-3 font-semibold">Category Filter</h1>
      <div className="w-[80%]">
        {distinct_category.map((category, index) => (
          <Link
            to={`/?category=${category}`}
            key={index}
            className="mb-3 flex items-center  "
          >
            <span style={{backgroundColor: color()}} className="rounded-full w-[15px] h-[15px] mr-2"></span>
            {category}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
