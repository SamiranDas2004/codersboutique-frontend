'use client'
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

export default function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        setLoading(true);
        if (!name || !email || !password) {
            toast.error('Please fill all the fields');
            setLoading(false)
            return;
        }
        if (!/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            toast.error('Invalid Email');
            setLoading(false)
            return;
        }
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API}/api/v1/user/signup`, {
                email, password, name
            });
            const data = response.data;
            toast.success(data?.message);
            setEmail('')
            setName('')
            setPassword('')
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
                <Typography my={2} variant='h5' textAlign={'center'}>Signup</Typography>
                <TextField sx={{ my: 1 }} name='name' fullWidth label={'name'}
                    value={name}
                    onChange={e => setName(e.target.value)} disabled={loading}
                />
                <TextField sx={{ my: 1 }} name='email' fullWidth label={'email'}
                    value={email}
                    onChange={e => setEmail(e.target.value)} disabled={loading}
                />
                <TextField sx={{ my: 1 }} name='password' fullWidth label={'password'}
                    value={password} type='password'
                    onChange={e => setPassword(e.target.value)} disabled={loading} />
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                    <Button startIcon={loading ? <CircularProgress size={15} /> : null} disabled={loading} onClick={handleSignup} sx={{ my: 1 }} variant='outlined' color='primary'>SignUp</Button>
                    {
                        loading ? null :
                            <Link style={{ marginTop: '3px', textDecoration: 'none' }} href="/"> Already have an account?
                            </Link>
                    }
                </Box>
            </Box>
        </Box>
    )
}
