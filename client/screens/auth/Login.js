import { View, Text, StyleSheet, Alert } from 'react-native'
import { useState } from "react";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputField from '../../components/forms/InputField';
import SubmitButton from '../../components/forms/SubmitButton';
import { useAuthContext } from '../../context/authContext';
import { usePostContext } from '../../context/postContext';
const Login = ({ navigation }) => {
  // global state
  const { setState } = useAuthContext()
  const { getUserPosts, getPosts } = usePostContext()
    // states
  const [userInformation, setUserInformation] = useState({
    email: "",
    password: "",
  });
    const [loading, setLoading] = useState(false)

    // functions

    const handleSubmit = async () => {
      setLoading(true);
      try {
        if (!userInformation.email || !userInformation.password) {
          Alert.alert("Oops!!!", "All fields must be filled.");
          setLoading(false);
          return;
        }
  
        const { data } = await axios.post(
          "http://192.168.1.10:5000/api/v1/auth/login",
          userInformation
        );
  
        await AsyncStorage.setItem('@auth', JSON.stringify(data));
        setState(data);
        getUserPosts();
        getPosts();
        
        Alert.alert("Success", data.message || "Logged in successfully.");
        navigation.navigate('Home');
      } catch (error) {
        setLoading(false);
        const message = error.response?.data?.message || "An error occurred. Please try again.";
        Alert.alert("Error", message);
        console.error("🚀 ~ handleSubmit ~ error:", error);
      } finally {
        setLoading(false); // Ensure loading is set to false
      }
    };
    
    
  return (
    <View style={styles.content}>
      <Text style={styles.Pagetitle}>Login</Text>
      <View style={{ marginHorizontal: 20 }}>
        
        <InputField
          label={"email"}
          keyboardType={"email-address"}
          autoComplete={"email"}
          value={userInformation.email}
          setValue={setUserInformation}
        />
        <InputField
          label={"password"}
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