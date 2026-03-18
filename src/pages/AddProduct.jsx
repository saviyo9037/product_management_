import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { addProduct } from '../services/productService';
import { ProductContext } from '../context/ProductContext';
import ProductF from '../components/ProductF';

function AddProduct() {
    const navigate=useNavigate();
    const { addProduct: addToContext } = useContext(ProductContext);
    const handleSubmit=async (data) => {
        try {
            await addProduct(data);
               addToContext({ ...data, id: Date.now() }); 
            alert("product added");
                
            navigate("/");
        } catch (error) {
            alert("product adding failed");
        }
    }
  return <ProductF initialValues={{}} onSubmit={handleSubmit} isEdit={false} />;
  
}

export default AddProduct
