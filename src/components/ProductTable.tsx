// src/components/ProductTable.tsx
import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import { Product } from "../services/ProductService";

interface ProductTableProps {
    products: Product[];
    onDelete: (id: number) => Promise<void>;
    onUpdate: (product: Product) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, onDelete, onUpdate }) => {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Preço</TableCell>
                        <TableCell>Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>{product.title}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>
                                <Button onClick={() => onUpdate(product)}>Editar</Button>
                                <Button onClick={() => onDelete(product.id)}>Deletar</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProductTable;
