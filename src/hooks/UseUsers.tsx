import { useState, useEffect } from "react";
import axios from "axios";
import { createUser, getUsers, User, deleteUser as deleteUserApi } from "../services/UserService";

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            const data = await getUsers();
            setUsers(data);
            setLoading(false);
        };
        fetch();
    }, []);

    const addUser = async (newUser: Omit<User, "id">) => {
        const created = await createUser(newUser);
        setUsers((prev) => [...prev, created]);
    };

    const deleteUser = async (id: number) => {
        await deleteUserApi(id);
        setUsers((prev) => prev.filter((u) => u.id !== id));
    };

    const updateUser = async (id: number, updatedUser: User): Promise<void> => {
        try {
            const response = await axios.put(`https://fakestoreapi.com/users/${id}`, updatedUser)
            const updated = response.data;

            setUsers((prev) =>
                prev.map((u) => (u.id === updated.id ? updated : u))
            );
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            throw new Error("Erro ao atualizar usuário");
        }
    };

    return { users, loading, addUser, deleteUser, updateUser };
};
