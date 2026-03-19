import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProduct, getProducts } from "../services/productService";
import { ProductContext } from "../context/ProductContext";

function ProductList() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category,setCategory]=useState("all")

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

  const filtered = allProducts.filter((p) =>{
    const match=p.title?.toLowerCase().includes(search.toLowerCase())
    const categorymatch=category ==="all" || p.category === category
    return match && categorymatch
 } );

  if (loading) return <p>Loading...</p>;
  const filterCategory=["all",...new Set(allProducts.map(p=>p.category))]
  
  return (
    <div className="p-4">

      <div className="flex justify-between mb-4">
        <h2 className=" font-serif text-2xl">
          Products List</h2>

      
      </div>



      <div className="border-4 border-white p-3
     rounded-2xl  bg-white shadow-2xl
    flex justify-between mb-2" >

        <button
          onClick={() => navigate("/add")}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-amber-600"
        >
          Add Product
        </button>
<div>
<select name=""
value={category}
onChange={(e)=>setCategory(e.target.value)}
className=" border  mr-5  p-1 shadow rounded "
 id="">
  {filterCategory.map((c,index)=>(
    <option value={c} key={index}>{c}</option>
  ))}
 </select>
      <input
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
        className="border mb-3 p-1  "
      />
</div>

      </div>



   <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full">

     <thead className="bg-gradient-to-r from-amber-400 to-orange-500 text-white">
  
          <tr>
            <th className=" ">Title</th>
            <th className=" ">Price</th>
            <th className=" ">Category</th>
            <th className=" ">Stock</th>
            <th className=" ">Actions</th>
          </tr>
        </thead>

        <tbody className=" ml-1 ">
          {filtered.map((p) => (
            <tr className="  border-b  text-lg " key={p.id}>
              <td className="  p-1 ">{p.title}</td>
              <td className="  p-1">{p.price}</td>
              <td className="  p-1 ">{p.category}</td>
              <td className="  p-1">{p.stock}</td>

              <td className=" ">
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
    </div>
  );
}

export default ProductList;