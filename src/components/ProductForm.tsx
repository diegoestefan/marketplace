import React, { useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { Product } from "../services/ProductService";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface ProductFormProps {
    onAdd: (newProduct: Omit<Product, "id">) => void;
    onUpdate: (product: Product) => void;
    productToEdit: Product | null;
}

const schema = yup.object().shape({
    title: yup.string().required("O nome do produto é obrigatório"),
    price: yup
        .number()
        .typeError("Preço deve ser um número")
        .positive("Preço deve ser positivo")
        .required("O preço é obrigatório"),
});

const ProductForm: React.FC<ProductFormProps> = ({ onAdd, onUpdate, productToEdit }) => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { title: "", price: 0 }
    });

    useEffect(() => {
        if (productToEdit) {
            setValue("title", productToEdit.title);
            setValue("price", productToEdit.price);
        } else {
            reset({ title: "", price: 0 });
        }
    }, [productToEdit, reset, setValue]);

    const onSubmit = (data: { title: string; price: number }) => {
        if (productToEdit) {
            onUpdate({ ...productToEdit, ...data });
        } else {
            onAdd(data);
        }

        reset({ title: "", price: 0 });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                label="Nome do Produto"
                fullWidth
                margin="normal"
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
            />
            <TextField
                label="Preço"
                type="number"
                fullWidth
                margin="normal"
                {...register("price")}
                error={!!errors.price}
                helperText={errors.price?.message}
            />
            <Button variant="contained" color="primary" type="submit">
                {productToEdit ? "Atualizar Produto" : "Adicionar Produto"}
            </Button>
        </form>
    );
};

export default ProductForm;
