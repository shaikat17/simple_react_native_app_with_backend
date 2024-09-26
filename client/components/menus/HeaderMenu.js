import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useAuthContext } from '../../context/authContext'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from "@react-native-async-storage/async-storage";


const HeaderMenu = () => {
    // global context
    const [state, setState] = useAuthContext()

    // logout
    const handleLogout = async () => {
        setState({ token: '', user: null })
        await AsyncStorage.removeItem('@auth')
        alert('Logout Successfully.')
    }
  return (
    <View>
          <TouchableOpacity onPress={handleLogout}>
          <FontAwesome5 name='sign-out-alt' color="red" style={styles.iconStyle} />
      </TouchableOpacity>
    </View>
  )
}
export default HeaderMenu

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10,
justifyContent: 'space-between'
    },
    iconStyle: {
        marginBottom: 3,
        alignSelf: 'center',
        fontSize: 25
    }
})

