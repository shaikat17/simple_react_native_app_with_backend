import { View, Text, StyleSheet, Alert } from 'react-native'
import { useState } from "react";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputField from '../../components/forms/InputField';
import SubmitButton from '../../components/forms/SubmitButton';
import { useAuthContext } from '../../context/authContext';
const Login = ({ navigation }) => {
  // global state
  const { state, setState } = useAuthContext()
    // states
  const [userInformation, setUserInformation] = useState({
    email: "",
    password: "",
  });
    const [loading, setLoading] = useState(false)

    // functions

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (
        !userInformation.email ||
        !userInformation.password
      ) {
          Alert.alert("Opss!!!", "All field must be filled.");
          setLoading(false)
          return
      }
      setLoading(false);
      const { data } = await axios.post(
        "http://192.168.1.10:5000/api/v1/auth/login",
        { ...userInformation }
      );
      setState(data)
      // store on local storage
      await AsyncStorage.setItem('@auth', JSON.stringify(data))
      alert(data && data.message);
      navigation.navigate('Home')
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log("🚀 ~ handleSubmit ~ error:", error);
    }
  };
    
    
  return (
    <View style={styles.content}>
      <Text style={styles.Pagetitle}>Login</Text>
      <View style={{ marginHorizontal: 20 }}>
        
        <InputField
          lable={"email"}
          keyboardType={"email-address"}
          autoComplete={"email"}
          value={userInformation.email}
          setValue={setUserInformation}
        />
        <InputField
          lable={"password"}
          secureTextEntry={true}
          autoComplete={"password"}
          value={userInformation.password}
          setValue={setUserInformation}
        />
      </View>
      <SubmitButton
        btnTitle={"Login"}
        loading={loading}
        handleSubmit={handleSubmit}
          />
          <Text style={styles.subTitle}>Don't have an account? <Text style={styles.linkText} onPress={() => navigation.navigate('Register')}>Register</Text></Text>
      {/* <Text>{JSON.stringify(userInformation)}</Text> */}
    </View>
  )
}
export default Login

const styles = StyleSheet.create({
    content: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: "#e1d5c9",
    },
    Pagetitle: {
      fontSize: 40,
      fontWeight: "bold",
      textAlign: "center",
      color: "#1e2225",
      marginBottom: 20,
      },
      subTitle: {
        fontSize: 20,
        textAlign: "center",
      },
      linkText: {
        color: "#e81414db",
      },
  });