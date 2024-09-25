import { View, Text, StyleSheet } from 'react-native'
import { useAuthContext } from '../context/authContext'
import FooterMenu from '../components/menus/FooterMenu'
import {
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
  
const Home = () => {
    // global state
    const [state] = useAuthContext()

    const insets = useSafeAreaInsets();
  return (
      <View style={[styles.container, {
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
    }]}>
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