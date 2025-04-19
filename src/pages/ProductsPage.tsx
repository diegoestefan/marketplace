import React, { useState } from "react";
import ProductTable from "../components/ProductTable";
import ProductForm from "../components/ProductForm";
import { useProducts } from "../hooks/UseProducts";
import {
    Button,
    Stack,
    CircularProgress,
    Box,
    Typography,
    Paper,
    Divider
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Product } from "../services/ProductService";

const ProductsPage = () => {
    const { products, loading, addProduct, deleteProduct, updateProduct } = useProducts();
    const [productToEdit, setProductToEdit] = useState<Product | null>(null);
    const navigate = useNavigate();

    const handleEdit = (product: Product) => {
        setProductToEdit(product);
    };

    const handleUpdateProduct = async (updatedProduct: Product) => {
        await updateProduct(updatedProduct.id, updatedProduct);
        setProductToEdit(null);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={10}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 900, margin: "0 auto", px: 3, py: 4 }}>
            <Typography variant="h4" align="center" gutterBottom fontWeight={600}>
                Gerenciador de Produtos
            </Typography>

            <Box mb={3} display="flex" justifyContent="flex-start">
                <Button variant="outlined" onClick={() => navigate("/")}>Voltar para Início</Button>
            </Box>

            <Paper elevation={2} sx={{ p: 3, mb: 4, backgroundColor: "#f9f9f9" }}>
                <Typography variant="h6" gutterBottom>
                    {productToEdit ? "Editar Produto" : "Adicionar Produto"}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <ProductForm
                    onAdd={addProduct}
                    onUpdate={handleUpdateProduct}
                    productToEdit={productToEdit}
                />
            </Paper>

            <Paper elevation={2} sx={{ p: 3, backgroundColor: "#fefefe" }}>
                <Typography variant="h6" gutterBottom>
                    Lista de Produtos
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <ProductTable
                    products={products}
                    onDelete={deleteProduct}
                    onUpdate={handleEdit}
                />
            </Paper>
        </Box>
    );
};

export default ProductsPage;
