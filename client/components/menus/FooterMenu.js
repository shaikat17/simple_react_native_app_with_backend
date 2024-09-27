import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


const FooterMenu = () => {
    // hooks
    const navigation = useNavigation();
    const route = useRoute();

  return (
      <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <FontAwesome5 name='home' style={styles.iconStyle} color={route.name === 'Home' && 'red'} />
      <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Post')}>
          <FontAwesome5 name='plus-square' style={styles.iconStyle} color={route.name === 'Post' && 'red'} />
      <Text>Post</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Myposts')}>
          <FontAwesome5 name='list' style={styles.iconStyle} color={route.name === 'Myposts' && 'red'} />
      <Text>My Posts</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Account')}>
          <FontAwesome5 name='user' style={styles.iconStyle} color={route.name === 'Account' && 'red'} />
      <Text>Account</Text>
    </TouchableOpacity>
    </View>
  )
}
export default FooterMenu

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