import { createContext, ReactNode } from "react";

interface UserProps {
    name: string;
    avatarUrl: string;
}
export interface AuthContextDataProps{
    user:UserProps;
    signIn: () => Promise<void>;
}

export interface AuthProviderProps {
    children: ReactNode;
}
export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({children}:AuthProviderProps) {

    async function signIn() {
        console.log("Let's Log");
    }

    return (
        <AuthContext.Provider value={{
            signIn,
            user: {
                name: 'John Theo',
                avatarUrl: 'https://github.com/johntheo.png'
            }
        }}>
            {children}
        </AuthContext.Provider>
    )
}