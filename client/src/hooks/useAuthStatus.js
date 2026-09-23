import { useEffect, useState } from 'react'
import api from '../../api/axios'

export function useAuthStatus() {
    const [status, setStatus] = useState('checking')

    useEffect(() => {
        api.get('/api/auth/me', {
            headers: {
                'Cache-Control': 'no-cache',
            },
        })
            .then(() => setStatus('authenticated'))
            .catch(() => setStatus('unauthenticated'))
    }, [])

    return {
        isChecking: status === 'checking',
        isAuthenticated: status === 'authenticated',
    }
}