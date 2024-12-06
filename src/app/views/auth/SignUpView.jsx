'use client';
import { Box, Button, CircularProgress, TextField, Typography, Paper } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleSignup = async () => {
        setLoading(true);
        if (!name || !email || !password) {
            toast.error('Please fill all the fields');
            setLoading(false);
            return;
        }
        if (!/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            toast.error('Invalid Email');
            setLoading(false);
            return;
        }
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/user/signup`,
                { email, password, name }
            );
            const data = response.data;
            toast.success(data?.message);
            setEmail('');
            setName('');
            setPassword('');
            router.push('/');
        } catch (err) {
            if (err?.response && err?.response?.data) toast.error(err?.response?.data?.message);
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
                    Create Your Account
                </Typography>
                <Typography
                    variant="body1"
                    textAlign="center"
                    color="textSecondary"
                    mb={3}
                >
                    Please fill in the details below to sign up.
                </Typography>
                <TextField
                    sx={{ my: 1 }}
                    name="name"
                    fullWidth
                    label="Full Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                />
                <TextField
                    sx={{ my: 1 }}
                    name="email"
                    fullWidth
                    label="Email Address"
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
                        onClick={handleSignup}
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
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </Button>
                    {!loading && (
                        <Typography
                            variant="body2"
                            mt={2}
                            color="textSecondary"
                            textAlign="center"
                        >
                            Already have an account?{' '}
                            <Link
                                href="/"
                                style={{
                                    textDecoration: 'none',
                                    color: '#1976d2',
                                    fontWeight: 'bold',
                                }}
                            >
                                Log in here!
                            </Link>
                        </Typography>
                    )}
                </Box>
            </Paper>
        </Box>
    );
}
