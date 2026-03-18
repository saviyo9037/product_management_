import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addProduct } from '../services/productService';
import { ProductContext } from '../context/ProductContext';
import ProductF from '../components/ProductF';

function AddProduct() {
    const [success,setSuccess]=useState("")
    const navigate=useNavigate();
    const { addProduct: addToContext } = useContext(ProductContext);
    const handleSubmit=async (data) => {
        try {
            await addProduct(data);
               addToContext({ ...data, id: Date.now() }); 
            // alert("product added");


            setSuccess("product added")
   setTimeout(()=>{
            navigate("/");
    
   },2000)                

        } catch (error) {
            // alert("product adding failed");
            setSuccess("product add failed")
        }
    }
  return(
  
<>
<div>{success && (
    <div className=' p-2 text-green-700 rounded-2xl mb-3' >{success}</div>
)}</div>
<ProductF initialValues={{}} onSubmit={handleSubmit} isEdit={false} />;

</>
  );
}

export default AddProduct
