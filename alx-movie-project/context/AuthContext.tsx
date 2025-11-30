import { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
    sessionId: string | null;
    accountId: number | null;
    isAuthenticated: boolean;
    setAuthData: (data: { sessionId: string; accountId: number; }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    
    const [sessionId, setSessionId] = useState<string | null>(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('tmdb_session_id');
        }
        return null;
    });

    const [accountId, setAccountId] = useState<number | null>(() => {
        if (typeof window !== 'undefined') {
            const storedAccountId = localStorage.getItem('tmdb_account_id');
            return storedAccountId ? parseInt(storedAccountId) : null;
        }
        return null;
    });
    
    const setAuthData = (data: { sessionId: string; accountId: number; }) => {
        setSessionId(data.sessionId); 
        setAccountId(data.accountId);
        
        localStorage.setItem('tmdb_session_id', data.sessionId);
        localStorage.setItem('tmdb_account_id', data.accountId.toString());
    };
    
    const isAuthenticated = !!sessionId && !!accountId; 

    return (
        <AuthContext.Provider value={{ sessionId, accountId, isAuthenticated, setAuthData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('Error with AuthProvider');
    }
    
    return context;
};