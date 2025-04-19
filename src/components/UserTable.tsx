import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import { User } from "../services/UserService";

interface UserTableProps {
    users: User[];
    onDelete: (id: number) => Promise<void>;
    onUpdate: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onDelete, onUpdate }) => {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome de Usuário</TableCell>
                        <TableCell>E-mail</TableCell>
                        <TableCell>Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <Button onClick={() => onUpdate(user)}>Editar</Button>
                                <Button onClick={() => onDelete(user.id)}>Deletar</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserTable;
