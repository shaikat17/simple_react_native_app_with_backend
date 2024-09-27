import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import {
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import FooterMenu from '../components/menus/FooterMenu'
import PostCard from '../components/PostCard';
import { usePostContext } from '../context/postContext';
const MyPosts = () => {
    // global state
    const {loading, userPosts } = usePostContext();
    const insets = useSafeAreaInsets();

  return (
      <View style={[styles.container, {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
      }]}>
          {loading ? <ActivityIndicator style={{ flex: 1 }} size="large" color="#ea2222" /> : <ScrollView>
          <PostCard posts={userPosts} userPostScreen={true} />
          </ScrollView>}
          <View style={{ backgroundColor: "white" }}>
          <FooterMenu />
      </View>
    </View>
  )
}
export default MyPosts

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        margin: 10,
    }
})