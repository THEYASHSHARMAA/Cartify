import { create } from "zustand";
export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all feild." };
    }
    // now we fetch the api and add the new product
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));
    //here we add newproduct globally
    return { success: true, message: "Product Created succesfully" };
  },
}));
// its a global state variable it like nrml usestate in
// which we give product and setProduct  as localy
