import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import Home from "../../screens/Home";
import Register from "../../screens/auth/Register";
import Login from "../../screens/auth/Login";
import { useAuthContext } from "../../context/authContext";
import HeaderMenu from "./HeaderMenu";

const ScreenMenu = () => {
  // global state
  const [state] = useAuthContext();

  const Stack = createNativeStackNavigator();

  // auth logic
  const authenticateUser = state?.user && state?.token;
  return (
    <Stack.Navigator initialRouteName="Login">
      {authenticateUser ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
                      options={{ 
                          title: 'Full Stack React Native App',
                          headerRight: () => <HeaderMenu />
             }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        </>
      )}

      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default ScreenMenu;
