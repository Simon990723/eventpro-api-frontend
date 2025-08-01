import React, {createContext, useState, useContext, useEffect, useMemo, useCallback, type ReactNode} from 'react';
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
    email: string;
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string | string[];
}

interface User {
    email: string;
    roles: string[];
    token: string;
}

interface AuthContextType {
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const decodeAndSetUser = useCallback((token: string) => {
        try {
            const decoded = jwtDecode<DecodedToken>(token);
            let roles = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            if (typeof roles === 'string') {
                roles = [roles];
            }
            setUser({email: decoded.email, roles: roles || [], token});
        } catch (error) {
            console.error("Failed to decode token:", error);
            setUser(null);
            localStorage.removeItem('authToken');
        }
    }, []);

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            decodeAndSetUser(storedToken);
        }
        setIsLoading(false);
    }, [decodeAndSetUser]);

    const login = useCallback((newToken: string) => {
        localStorage.setItem('authToken', newToken);
        decodeAndSetUser(newToken);
    }, [decodeAndSetUser]);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem('authToken');
    }, []);

    const value = useMemo(() => ({
        user,
        login,
        logout,
        isLoading
    }), [user, isLoading, login, logout]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};