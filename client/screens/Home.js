import { View, Text, StyleSheet } from 'react-native'
import { useAuthContext } from '../context/authContext'
import FooterMenu from '../components/menus/FooterMenu'
const Home = () => {
    // global state
    const [state] = useAuthContext()
  return (
    <View style={styles.container}>
          <Text>{JSON.stringify(state, null, 4)}</Text>
          <FooterMenu />
    </View>
  )
}
export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        margin: 10,
    }
})