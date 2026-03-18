import axios from "axios"

const BASE_URL="https://dummyjson.com/products"

export const getProducts=async()=>
{
    try {
        const response= await axios.get(`${BASE_URL}`);
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

// export const getProduct=(id)=axios.get(`${BASE_URL}/${id}`);

export const getProduct =async (id) => {
    try {
        const response=await axios.get(`${BASE_URL}/${id}` );
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
    
}

export const addProduct=async(data)=>{
    try {
    const response=await axios.post(`${BASE_URL}/add`,data)
        return response.data
    } catch (error) {
        console.log(error)
        throw error;
    }
}
export const updateProduct = async(id, data) =>{
    try {
        const response=await axios.put(`${BASE_URL}/${id}`, data);
        return response.data
    } catch (error) {
console.log(error);
        throw error;

    }
}
export const deleteProduct=async(id)=>{
    try {
        const response=await axios.delete(`${BASE_URL}/${id}`);
        return response.data
    } catch (error) {
        console.log(error)
        throw error;

        
    }
}
