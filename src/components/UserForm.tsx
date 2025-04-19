import React, { useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { User } from "../services/UserService";

const schema = yup.object().shape({
    email: yup
        .string()
        .email("E-mail inválido")
        .required("O e-mail é obrigatório"),
    username: yup.string().required("O nome de usuário é obrigatório"),
    password: yup.string().required("A senha é obrigatória"),
});

interface UserFormProps {
    onAdd: (newUser: { email: string; username: string; password: string }) => void;
    onUpdate: (user: { email: string; username: string; password: string }) => void;
    userToEdit: User | null;
}

const UserForm: React.FC<UserFormProps> = ({ onAdd, onUpdate, userToEdit }) => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
        },
    });

    useEffect(() => {
        if (userToEdit) {
            setValue("email", userToEdit.email);
            setValue("username", userToEdit.username);
            setValue("password", userToEdit.password);
        } else {
            reset({
                email: "",
                username: "",
                password: "",
            });
        }
    }, [userToEdit, reset, setValue]);

    const onSubmit = (data: { email: string; username: string; password: string }) => {
        const userWithoutId = {
            email: data.email,
            username: data.username,
            password: data.password,
        };

        if (userToEdit) {
            onUpdate(userWithoutId); // Atualiza sem id
        } else {
            onAdd(userWithoutId); // Adiciona sem id
        }

        reset({
            email: "",
            username: "",
            password: "",
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                label="Email"
                fullWidth
                margin="normal"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
            />
            <TextField
                label="Nome de Usuário"
                fullWidth
                margin="normal"
                {...register("username")}
                error={!!errors.username}
                helperText={errors.username?.message}
            />
            <TextField
                label="Senha"
                type="password"
                fullWidth
                margin="normal"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
            />
            <Button variant="contained" color="primary" type="submit">
                {userToEdit ? "Atualizar Usuário" : "Adicionar Usuário"}
            </Button>
        </form>
    );
};

export default UserForm;
