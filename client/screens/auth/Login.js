import { View, Text, StyleSheet, Alert } from 'react-native'
import { useState } from "react";
import InputField from '../../components/forms/InputField';
import SubmitButton from '../../components/forms/SubmitButton';
const Login = () => {
    // states
  const [userInformation, setUserInformation] = useState({
    email: "",
    password: "",
  });
    const [loading, setLoading] = useState(false)

    // functions

  const handleSubmit = () => {
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
      console.log(userInformation);
    } catch (error) {
      setLoading(false);
      console.log("🚀 ~ handleSubmit ~ error:", error);
    }
  };
    
    
  return (
    <View style={styles.content}>
      <Text style={styles.Pagetitle}>Register</Text>
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
          <Text style={styles.linkText}>Don't have an account? </Text>
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
      linkText: {
          fontSize: 20,
          textAlign: 'center'
    }
  });