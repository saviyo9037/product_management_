import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProduct, getProducts } from "../services/productService";
import { ProductContext } from "../context/ProductContext";

function ProductList() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const { newProducts, removeProduct } = useContext(ProductContext);
  const navigate = useNavigate();

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
      console.log('delete id:', id);
    
      setProducts(prev => prev.filter(p => Number(p.id) !== productId));
      try {
        await deleteProduct(id);
        console.log('delete success:', id);
        await fetchProduct();
      } catch (error) {
        console.error('delete failed:', id, error);
     
        fetchProduct();
      }
    }
  };

  const filtered = allProducts.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">

      <div className="flex justify-between mb-4">
        <h2 className=" font-serif text-2xl">Products List</h2>

      
      </div>
      <div className=" flex justify-between mb-2" >

        <button
          onClick={() => navigate("/add")}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-amber-600"
        >
          Add Product
        </button>

      <input
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
        className="border mb-3"
      />
      </div>

      <table className="w-full border">
        <thead>
          <tr className=" border bg-amber-400">
            <th className=" border">Title</th>
            <th className=" border">Price</th>
            <th className=" border">Category</th>
            <th className=" border">Stock</th>
            <th className=" border">Actions</th>
          </tr>
        </thead>

        <tbody className=" ml-1">
          {filtered.map((p) => (
            <tr className="  " key={p.id}>
              <td className=" border p-1 ">{p.title}</td>
              <td className=" border p-1">{p.price}</td>
              <td className=" border p-1 ">{p.category}</td>
              <td className=" border p-1">{p.stock}</td>

              <td className=" border">
             <div className="  p-2 flex justify-between">
                 <button onClick={() => navigate(`/edit/${p.id}`)} 
                 className=" hover:bg-yellow-500 bg-blue-400 p-1  rounded-xl">
                  Edit
                </button>

                <button className=" rounded-xl bg-red-700 text-white p-1 hover:bg-amber-500"
                onClick={() => handleDelete(p.id)}>
                  Delete
                </button>
             </div>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default ProductList;