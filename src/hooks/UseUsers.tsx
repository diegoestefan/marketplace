import { useState, useEffect } from "react";
import {getUsers, createUser, updateUser, deleteUser, User} from "../services/UserService";

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            console.error("Erro ao carregar usuários:", error);
        } finally {
            setLoading(false);
        }
    };

    const addUser = async (newUser: Omit<User, "id">) => {
        try {
            await createUser(newUser);
            loadUsers();
        } catch (error) {
            console.error("Erro ao adicionar usuário:", error);
        }
    };

    const updateUserHandler = async (id: number, updatedUser: Omit<User, "id">) => {
        try {
            await updateUser(id, updatedUser);
            loadUsers();
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
        }
    };

    const deleteUserHandler = async (id: number) => {
        try {
            await deleteUser(id);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    return {
        users,
        loading,
        addUser,
        updateUser: updateUserHandler,
        deleteUser: deleteUserHandler
    };
};
