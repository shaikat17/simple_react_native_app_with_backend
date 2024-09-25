import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { useState } from "react";
import InputField from "../../components/forms/InputField";
import SubmitButton from "../../components/forms/SubmitButton";

const Register = () => {
  // states
  const [userInformation, setUserInformation] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // functions

  const handleSubmit = () => {
    try {
      setLoading(true);
      if (
        !userInformation.name ||
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
          lable={"name"}
          keyboardType={"text"}
          autoComplete={"name"}
          value={userInformation.name}
          setValue={setUserInformation}
        />
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
        btnTitle={"Register"}
        loading={loading}
        handleSubmit={handleSubmit}
      />
      {/* <Text>{JSON.stringify(userInformation)}</Text> */}
    </View>
  );
};
export default Register;

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
});
