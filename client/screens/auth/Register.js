import { View, Text, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { useState } from "react";
import InputField from "../../components/forms/InputField";
import SubmitButton from "../../components/forms/SubmitButton";

const Register = ({ navigation }) => {
  // states
  const [userInformation, setUserInformation] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // functions

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Validation
      if (
        !userInformation.name ||
        !userInformation.email ||
        !userInformation.password
      ) {
        Alert.alert("Oops!!!", "All fields must be filled.");
        setLoading(false);
        return;
      }

      const { data } = await axios.post(
        "https://react-native-backend-ten.vercel.app/api/v1/auth/register",
        userInformation
      );

      Alert.alert("Success", data.message || "Registration successful.");
      navigation.navigate('Login');
    } catch (error) {
      setLoading(false); // Ensure loading is reset
      const message = error.response?.data?.message || "An error occurred. Please try again.";
      Alert.alert("Error", message);
      console.error("🚀 ~ handleSubmit ~ error:", error);
    } finally {
      setLoading(false); // Ensure loading is set to false after operations
    }
  };

  return (
    <View style={styles.content}>
      <Text style={styles.Pagetitle}>Register</Text>
      <View style={{ marginHorizontal: 20 }}>
        <InputField
          label={"name"}
          keyboardType={"text"}
          autoComplete={"name"}
          value={userInformation.name}
          setValue={setUserInformation}
        />
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
        btnTitle={"Register"}
        loading={loading}
        handleSubmit={handleSubmit}
      />
      <Text style={styles.subTitle}>
        Already have an account?{" "}
        <Text
          onPress={() => navigation.navigate("Login")}
          style={styles.linkText}
        >
          Login
        </Text>
      </Text>
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
  subTitle: {
    fontSize: 20,
    textAlign: "center",
  },
  linkText: {
    color: "#e81414db",
  },
});
