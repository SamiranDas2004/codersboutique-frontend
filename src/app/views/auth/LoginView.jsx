'use client'
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie';
import axios from 'axios'
import { toast } from 'react-toastify'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true);
        if (!email || !password) {
            toast.error('Please fill all the fields');
            return;
        }
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API}/api/v1/user/login`, {
                email, password
            });
            const data = response.data;
            Cookies.set('token', data.data.token);
            toast.success(data?.message);
            router.push('/pages/dashboard');
        }
        catch (err) {
            console.log({ err })
            if (err?.response && err?.response?.data)
                toast.error(err?.response?.data?.message);
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} minHeight={'100vh'} flexDirection={'column'}>
            <Box maxWidth={'70vw'}>
                <Typography my={2} variant='h5' textAlign={'center'}>Login</Typography>
                <TextField sx={{ my: 1 }} name='email' fullWidth label={'email'}
                    value={email}
                    onChange={e => setEmail(e.target.value)} disabled={loading}
                />
                <TextField sx={{ my: 1 }} name='password' fullWidth label={'password'}
                    value={password} type='password'
                    onChange={e => setPassword(e.target.value)} disabled={loading} />
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                    <Button startIcon={loading ? <CircularProgress size={15} /> : null} disabled={loading} onClick={handleLogin} sx={{ my: 1 }} variant='outlined' color='primary'>Login</Button>
                    {
                        loading ? null :
                            <Link style={{marginTop:'3px', textDecoration:'none'}} href="/pages/auth/signup">Create an account!</Link>
                    }
                </Box>
            </Box>
        </Box>
    )
}
