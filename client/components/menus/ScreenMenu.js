import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home";
import Register from "../../screens/auth/Register";
import Login from "../../screens/auth/Login";
import { useAuthContext } from "../../context/authContext";
import HeaderMenu from "./HeaderMenu";
import Post from "../../screens/Post";
import Account from "../../screens/Account";
import MyPosts from "../../screens/MyPosts";
import FullPost from "../FullPost";

const ScreenMenu = () => {
  // global state
  const { state } = useAuthContext();

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
          <Stack.Screen
            name="Post"
            component={Post}
            options={{ 
              headerBackTitle: 'Back',
                        headerRight: () => <HeaderMenu />
             }}
          />
          <Stack.Screen
            name="FullPost"
            component={FullPost}
            options={{ 
              headerBackTitle: 'Back',
                        headerRight: () => <HeaderMenu />
             }}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{ 
                        headerBackTitle: 'Back',
                        headerRight: () => <HeaderMenu />
             }}
          />
          <Stack.Screen
            name="MyPosts"
            component={MyPosts}
            options={{ 
              headerBackTitle: 'Back',
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
