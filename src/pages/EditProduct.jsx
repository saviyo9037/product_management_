import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ProductContext } from '../context/ProductContext';
import { getProduct, updateProduct } from '../services/productService';
import ProductF from '../components/ProductF';

function EditProduct() {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const [Product, setProduct] = useState(false);
    const navigate = useNavigate();
    const { newProducts, updateProduct: updated } = useContext(ProductContext);

    useEffect(() => {
        const productId = Number(id);
    
        const localProduct = newProducts.find(p => p.id === productId);
        if (localProduct) {
            setData(localProduct);
            return;
        }
  
        getProduct(id).then((res) => {
            setData(res);
            setProduct(true);
        }).catch(() => {
            navigate("/"); 
        });
    }, [id, newProducts, navigate]);


    // useEffect(()=>{
    //     const fetchProduct=async () => {
    //         try {
    //             const res=await getProduct(id);
    //             setData(res);
    //             setProduct(true)
    //         } catch (error) {
    //             navigate("/")
    //         }
            
    //     };
    //     fetchProduct();
    // },[id,newProducts,navigate])

const handleSubmit = async (form) => {
    const productId = Number(id);
    // const localProduct = newProducts.find(p => p.id === productId);

   
    updated(productId, form);

    alert("Updated (Local)");
    navigate("/");
};

    if (!data) return <p>Loading...</p>;

    return <ProductF initialValues={data} onSubmit={handleSubmit}
    
    
    isEdit={true} />;
}

export default EditProduct;

