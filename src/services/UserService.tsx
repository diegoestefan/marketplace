import api from "./Api";

export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
}

export const getUsers = async (): Promise<User[]> => {
    const response = await api.get<User[]>("/users");
    return response.data;
};

export const createUser = async (newUser: Omit<User, "id">): Promise<User> => {
    const response = await api.post<User>("/users", newUser);
    return response.data;
};

export const updateUser = async (id: number, updatedUser: Omit<User, "id">): Promise<User> => {
    const response = await api.put<User>(`/users/${id}`, updatedUser);
    return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
};
