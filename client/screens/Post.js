import { View, Text, StyleSheet } from 'react-native'
import FooterMenu from '../components/menus/FooterMenu'
import {
    useSafeAreaInsets,
} from 'react-native-safe-area-context';


const Post = () => {
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.container, {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }]}>
            <Text>Post</Text>
            <FooterMenu />
      </View>
  )
}
export default Post

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        margin: 10,
    }
})