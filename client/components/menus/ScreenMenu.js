import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View, Text } from 'react-native'
import Home from '../../screens/Home'
import Register from '../../screens/auth/Register'
import Login from '../../screens/auth/Login'

const ScreenMenu = () => {
    const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
        <Stack.Screen name="Register" component={Register} options={{headerShown: false}} />
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
      </Stack.Navigator>
  )
}
export default ScreenMenu