import React, { useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { User } from "../services/UserService";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface UserFormProps {
    onAdd: (newUser: Omit<User, "id">) => void;
    onUpdate: (user: User) => void;
    userToEdit: User | null;
}

const schema = yup.object().shape({
    username: yup.string().required("O nome de usuário é obrigatório"),
    email: yup.string().email("O e-mail deve ser válido").required("O e-mail é obrigatório"),
    password: yup.string().required("A senha é obrigatória"),
});

const UserForm: React.FC<UserFormProps> = ({ onAdd, onUpdate, userToEdit }) => {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { username: "", email: "", password: "" }
    });

    useEffect(() => {
        if (userToEdit) {
            setValue("username", userToEdit.username);
            setValue("email", userToEdit.email);
            setValue("password", userToEdit.password);
        } else {
            reset({ username: "", email: "", password: "" });
        }
    }, [userToEdit, reset, setValue]);

    const onSubmit = (data: { username: string; email: string; password: string }) => {
        if (userToEdit) {
            onUpdate({ ...userToEdit, ...data });
        } else {
            onAdd(data);
        }

        reset({ username: "", email: "", password: "" });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                label="Nome de Usuário"
                fullWidth
                margin="normal"
                {...register("username")}
                error={!!errors.username}
                helperText={errors.username?.message}
            />
            <TextField
                label="E-mail"
                type="email"
                fullWidth
                margin="normal"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
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
