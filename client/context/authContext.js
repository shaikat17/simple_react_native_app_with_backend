import { createContext, useState, useContext, useEffect } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


// context
const AuthContext = createContext()


// context provider
const AuthProvider = ({ children }) => {
    const [state, setState] = useState({
        user: null,
        token: ''
    })

    // default axios 
    axios.defaults.baseURL = 'http://192.168.1.10:5000/api/v1'
    // initial local storage data
  useEffect(() => {
    const loadLoaclStorageData = async () => {
      let data = await AsyncStorage.getItem("@auth");
      let loginData = JSON.parse(data);

      setState({ ...state, user: loginData?.user, token: loginData?.token });
    };
    loadLoaclStorageData();
  }, []);
    
    return <AuthContext.Provider value={[state, setState]}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider

export const useAuthContext = () => {
    return useContext(AuthContext)
}