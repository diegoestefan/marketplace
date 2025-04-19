import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={3} alignItems="center" mt={5}>
            <Typography variant="h4">Marketplace</Typography>
            <Button variant="contained" onClick={() => navigate("/products")}>
                Produtos
            </Button>
            <Button variant="contained" onClick={() => navigate("/users")}>
                Usuários
            </Button>
        </Stack>
    );
};

export default HomePage;