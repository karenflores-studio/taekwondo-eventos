
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useLogout } from '../context/session.context'

export default function Logout() {
    const logout = useLogout()
    const navigate = useNavigate()

    useEffect(() => {
        logout()
        navigate('/login')
    }, [logout, navigate])

    return null
}
