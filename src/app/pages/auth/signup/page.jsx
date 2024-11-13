import React from 'react'
import SignUpView from '@/app/views/auth/SignUpView'

export default function page() {
    return (
        <SignUpView />
    )
}

export const generateMetadata = () => {
    return {
        title: 'SignUp',
        description: 'SignUp'
    }
}