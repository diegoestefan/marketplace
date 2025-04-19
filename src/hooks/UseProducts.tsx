import { useState, useEffect } from "react";
import axios from "axios";
import {createProduct, getProducts, Product, deleteProduct as deleteProductApi} from "../services/ProductService";

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            const data = await getProducts();
            setProducts(data);
            setLoading(false);
        };
        fetch();
    }, []);

    const addProduct = async (newProduct: Omit<Product, "id">) => {
        const created = await createProduct(newProduct);
        setProducts((prev) => [...prev, created]);
    };

    const deleteProduct = async (id: number) => {
        await deleteProductApi(id); // <- agora está usando a função da API
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };


    const updateProduct = async (id: number, updatedProduct: Product): Promise<void> => {
        try {
            const response = await axios.put(`https://fakestoreapi.com/products/${id}`, updatedProduct);
            const updated = response.data;

            setProducts((prev) =>
                prev.map((p) => (p.id === updated.id ? updated : p))
            );
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            throw new Error("Erro ao atualizar produto");
        }
    };

    return { products, loading, addProduct, deleteProduct, updateProduct };
};
