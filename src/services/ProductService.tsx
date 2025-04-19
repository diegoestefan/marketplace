import axios from "axios";

export interface Product {
    id: number;
    title: string;
    price: number;
}

const API_URL = "https://fakestoreapi.com/products";

export const getProducts = async (): Promise<Product[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createProduct = async (product: Omit<Product, "id">): Promise<Product> => {
    const response = await axios.post(API_URL, product);
    return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};

export const updateProduct = async (id: number, updatedProduct: Product): Promise<Product> => {
    const response = await axios.put(`${API_URL}/${id}`, updatedProduct);
    return response.data;
};
