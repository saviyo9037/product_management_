import axios from "axios"

const BASE_URL="https://dummyjson.com/products"

export const getProducts=()=>axios.get(BASE_URL);

// export const getProduct=(id)=axios.get(`${BASE_URL}/${id}`);

export const getProduct=(id)=>axios.get(`${BASE_URL}/${id}` );

export const addProduct=(data)=>axios.post(`${BASE_URL}/add`,data)
export const updateProduct = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deleteProduct=(id)=>axios.delete(`${BASE_URL}/${id}`);
