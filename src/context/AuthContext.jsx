import { useEffect } from 'react';
import { createContext, useState, useContext } from 'react';
import { usersAPI } from '../services/usersservice';
const UserContext = createContext();
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [Authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const verify = async () => {
            try {
                const response = await usersAPI.verifyAccess();
                setUser(response.user);
                setAuthenticated(true);
            } catch (error) {
                setAuthenticated(false);
                setUser(null);

            }
            finally {
                setLoading(false);
            }
        }
        verify();
    }, []);

    const values = {
        user,
        setUser,
        Authenticated,
        setAuthenticated,
        loading
    }
    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    );
};
export const UseUserContext = () => {
    return useContext(UserContext);
}