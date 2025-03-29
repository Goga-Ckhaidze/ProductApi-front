import {create} from "zustand"

export const useProductStore = create((set, get) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return { success: false, message: "Please fill in all fields" }
        }
        const res = await fetch ("https://productapi-back.onrender.com/api/product", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newProduct)
        })
        const data = await res.json();
        set((state) => ({ products:[...state.products, data.data] }))
        return { success: true, message: "Product created succesfully" }
    },
    fetchProducts: async() => {
        const res = await fetch('https://product-api-front.vercel.app/create/api/products');
        const data = await res.json();
        set({ products: data.data })
    },
    deleteProduct: async (id) => {
        const res = await fetch(`https://product-api-front.vercel.app/create/api/product/${id}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if(!data.success) return { success: false, message: data.message }
        
        set(state => ({ products: state.products.filter(product => product._id !== id ) }))
        return { success: true, message: data.message }
    },
    updateProduct: async (id, updateProduct) => {

        const res = await fetch(`https://product-api-front.vercel.app/create/api/product/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateProduct),
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };
        set(state => ({
            products: state.products.map(product => product._id === updateProduct._id ? data.data : product)
        }))
        return { success: true, message: data.message }
        }
}))
