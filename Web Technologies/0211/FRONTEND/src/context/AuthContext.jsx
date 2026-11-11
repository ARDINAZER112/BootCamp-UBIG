import { createContext, useContext, useState } from "react";
import api from '../api/api'

const AuthContext = createContext(null)

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const raw = localStorage.getItem('user')
        return raw ? JSON.parse(raw) : null
    })

    const login = async (id_card_number, password) => {
        const { data } = await api.post('/auth/login', { id_card_number, password });
        const { token, ...profile } = data
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(profile))
        setUser(profile)
    }

    const logout = async () => {
        let message = 'Logout success'
        try {
            const { data } = await api.post('/auth/logout')
            message = data.message
        } catch {
            //token tidak valid, tetap bersihkan sisi client || 
        }
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
        return message
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider >
    )
}