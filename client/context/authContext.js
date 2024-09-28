import { createContext, useState, useContext, useEffect } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";


// context
const AuthContext = createContext()


// context provider
const AuthProvider = ({ children }) => {
    const [state, setState] = useState({
        user: null,
        token: ''
    })

  
    
    // initial local storage data
    useEffect(() => {
      const loadLocalStorageData = async () => {
          try {
              const data = await AsyncStorage.getItem('@auth');
              const loginData = JSON.parse(data);
              
              if (loginData) {
                  setState({ user: loginData.user, token: loginData.token });
              }
          } catch (error) {
              console.error("Error loading local storage data:", error);
          }
      };
      loadLocalStorageData();
  }, []);
    
    return <AuthContext.Provider value={{state, setState}}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider

export const useAuthContext = () => {
    return useContext(AuthContext)
}