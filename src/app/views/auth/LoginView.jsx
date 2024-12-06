'use client';
import { Box, Button, CircularProgress, TextField, Typography, Paper } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true);
        if (!email || !password) {
            toast.error('Please fill all the fields');
            setLoading(false);
            return;
        }
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API}/api/v1/user/login`, {
                email,
                password,
            });
            const data = response.data;
            Cookies.set('token', data.data.token);

            toast.success(data?.message);

            router.push('/pages/dashboard');
        } catch (err) {
            if (err?.response && err?.response?.data)
                toast.error(err?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f5f5f5"
            px={2}
        >
            <Paper
                elevation={3}
                sx={{
                    maxWidth: '400px',
                    width: '100%',
                    p: 4,
                    borderRadius: 2,
                    bgcolor: '#fff',
                }}
            >
                <Typography
                    variant="h4"
                    textAlign="center"
                    fontWeight="bold"
                    color="primary"
                    mb={2}
                >
                    Welcome Back!
                </Typography>
                <Typography
                    variant="body1"
                    textAlign="center"
                    color="textSecondary"
                    mb={3}
                >
                    Please login to continue.
                </Typography>
                <TextField
                    sx={{ my: 1 }}
                    name="email"
                    fullWidth
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                />
                <TextField
                    sx={{ my: 1 }}
                    name="password"
                    fullWidth
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                />
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    mt={2}
                >
                    <Button
                        startIcon={loading ? <CircularProgress size={15} /> : null}
                        disabled={loading}
                        onClick={handleLogin}
                        sx={{
                            my: 1,
                            width: '100%',
                            bgcolor: 'primary.main',
                            color: 'white',
                            '&:hover': {
                                bgcolor: 'primary.dark',
                            },
                        }}
                        variant="contained"
                    >
                        {loading ? 'Logging In...' : 'Login'}
                    </Button>
                    {!loading && (
                        <Typography
                            variant="body2"
                            mt={2}
                            color="textSecondary"
                            textAlign="center"
                        >
                            Don't have an account?{' '}
                            <Link
                                href="/pages/auth/signup"
                                style={{
                                    textDecoration: 'none',
                                    color: '#1976d2',
                                    fontWeight: 'bold',
                                }}
                            >
                                Sign up here!
                            </Link>
                        </Typography>
                    )}
                </Box>
            </Paper>
        </Box>
    );
}
