import React, { useState } from "react";
import { Button, CircularProgress, Box, Typography, Paper, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";
import { useUsers } from "../hooks/UseUsers";
import { User } from "../services/UserService";

const UsersPage = () => {
    const { users, loading, addUser, updateUser, deleteUser } = useUsers();  // Agora inclui deleteUser
    const [userToEdit, setUserToEdit] = useState<User | null>(null);
    const navigate = useNavigate();

    const handleEdit = (user: User) => {
        setUserToEdit(user);
    };

    const handleUpdateUser = (updatedUser: Omit<User, "id" | "password">) => {
        if (userToEdit) {
            const updatedUserWithId: User = {
                ...updatedUser,
                id: userToEdit.id,
                password: userToEdit.password,
            };
            updateUser(updatedUserWithId.id, updatedUserWithId);
        }
        setUserToEdit(null);
    };

    const handleAddUser = (newUser: Omit<User, "id">) => {
        addUser(newUser);
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
                Gerenciador de Usuários
            </Typography>

            <Box mb={3} display="flex" justifyContent="flex-start">
                <Button variant="outlined" onClick={() => navigate("/")}>
                    Voltar para Início
                </Button>
            </Box>

            <Paper elevation={2} sx={{ p: 3, mb: 4, backgroundColor: "#f9f9f9" }}>
                <Typography variant="h6" gutterBottom>
                    {userToEdit ? "Editar Usuário" : "Adicionar Usuário"}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <UserForm
                    onAdd={handleAddUser}
                    onUpdate={handleUpdateUser}
                    userToEdit={userToEdit}
                />
            </Paper>

            <Paper elevation={2} sx={{ p: 3, backgroundColor: "#fefefe" }}>
                <Typography variant="h6" gutterBottom>
                    Lista de Usuários
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <UserTable
                    users={users}
                    onEdit={handleEdit}
                    onDelete={deleteUser}
                />
            </Paper>
        </Box>
    );
};

export default UsersPage;
