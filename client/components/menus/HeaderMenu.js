import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { useAuthContext } from '../../context/authContext'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePostContext } from '../../context/postContext';


const HeaderMenu = () => {
    // global context
  const { setState } = useAuthContext()
  const { setUserPosts, setAllPosts } = usePostContext()

    // logout
    const handleLogout = async () => {
      try {
        setState({ token: '', user: null });
        setAllPosts([]);
        setUserPosts([]);
        await AsyncStorage.removeItem('@auth');
        alert('Logout Successfully.');
      } catch (error) {
        console.error("Logout error:", error);
        alert('An error occurred during logout.');
      }
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

