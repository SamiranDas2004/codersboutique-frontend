import React from 'react'
import LoginView from '@/app/views/auth/LoginView'

export default function page() {
    return (
        <LoginView />
    )
}

export const generateMetadata = () => {
    return {
        title: 'Login',
        description: 'login'
    }
}