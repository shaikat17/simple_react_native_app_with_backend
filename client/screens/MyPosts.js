import { View, StyleSheet, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'
import {
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useState } from 'react';
import FooterMenu from '../components/menus/FooterMenu'
import PostCard from '../components/PostCard';
import { usePostContext } from '../context/postContext';
const MyPosts = () => {
    // global state
    const { loading, userPosts, getPosts } = usePostContext();
    
    // local state
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async () => {
        setRefreshing(true);
        await getPosts();
        setRefreshing(false);
    };
    const insets = useSafeAreaInsets();

  return (
      <View style={[styles.container, {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
      }]}>
          {loading ? <ActivityIndicator style={{ flex: 1 }} size="large" color="#ea2222" /> : <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
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