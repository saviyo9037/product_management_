import { Children, createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [newProducts, setNewProduct] = useState([]);

  const addProduct = (product) => {
    const newProduct = { ...product, id: Date.now() };
    console.log("adding", product);

    setNewProduct((p) => [newProduct, ...p]);
  };
  const removeProduct = (id) => {
    setNewProduct((p) => p.filter((p) => p.id !== id));
  };
  const updateProduct = (id, updatedData) => {
    setNewProduct((p) =>
      p.map((p) => (p.id === id ? { ...p, ...updatedData } : p)),
    );
  };
  return (
    <ProductContext.Provider
      value={{ newProducts, addProduct, removeProduct, updateProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};
