import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProduct, getProducts } from "../services/productService";
import { ProductContext } from "../context/ProductContext";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const { newProducts, removeProduct } = useContext(ProductContext);
  const navigate = useNavigate();

  const itemsPerPage = 5;

  const fetchProduct = async () => {
    try {
      const response = await getProducts();
      setProducts(response.products || response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const allProducts = [...newProducts, ...products];

  const handleDelete = async (id) => {
    if (!window.confirm("Delete?")) return;

    const productId = Number(id);
    const isLocal = newProducts.some((p) => Number(p.id) === productId);

    if (isLocal) {
      removeProduct(productId);
    } else {
      setProducts((prev) => prev.filter((p) => Number(p.id) !== productId));
      try {
        await deleteProduct(id);
        await fetchProduct();
      } catch (error) {
        console.error("delete failed:", id, error);
        fetchProduct();
      }
    }
  };

  const filtered = allProducts.filter((p) => {
    const match = p.title?.toLowerCase().includes(search.toLowerCase());
    const categorymatch = category === "all" || p.category === category;
    return match && categorymatch;
  });

  const filterCategory = [
    "all",
    ...new Set(allProducts.map((p) => p.category)),
  ];

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filtered.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="font-serif text-2xl">Products List</h2>
      </div>

      <div className="border-4 border-white p-3 rounded-2xl bg-white shadow-2xl flex justify-between mb-2">
        <button
          onClick={() => navigate("/add")}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-amber-600"
        >
          Add Product
        </button>

        <div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border mr-5 p-1 shadow rounded"
          >
            {filterCategory.map((c, index) => (
              <option value={c} key={index}>
                {c}
              </option>
            ))}
          </select>

          <input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border mb-3 p-1"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-amber-400 to-orange-500 text-white">
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((p) => (
                <tr className="border-b text-lg" key={p.id}>
                  <td className="p-1">{p.title}</td>
                  <td className="p-1">{p.price}</td>
                  <td className="p-1">{p.category}</td>
                  <td className="p-1">{p.stock}</td>

                  <td>
                    <div className="p-2 flex justify-between">
                      <button
                        onClick={() => navigate(`/edit/${p.id}`)}
                        className="hover:bg-yellow-500 bg-blue-400 p-1 rounded-xl"
                      >
                        Edit
                      </button>

                      <button
                        className="rounded-xl bg-red-700 text-white p-1 hover:bg-amber-500"
                        onClick={() => handleDelete(p.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filtered.length > 0 && (
        <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductList;
