import { View, StyleSheet, ScrollView, ActivityIndicator, RefreshControl, Text } from 'react-native'
import {
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import FooterMenu from '../components/menus/FooterMenu'
import PostCard from '../components/PostCard';
import { usePostContext } from '../context/postContext';
const MyPosts = () => {
    // global state
    const { loading, userPosts, getUserPosts } = usePostContext();
    
    // local state
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);

    const onRefresh = async () => {
    setRefreshing(true);
    try {
      await getUserPosts();
    } catch (err) {
      setError(err.message || "Failed to fetch posts");
    } finally {
      setRefreshing(false);
    }
    };

    useEffect(() => {
    onRefresh();
    }, []);
    const insets = useSafeAreaInsets();

  return (
      <View style={[styles.container, {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
      }]}>
          {loading ? <ActivityIndicator style={{ flex: 1 }} size="large" color="#ea2222" /> : <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          {userPosts.length === 0 ? (
            <Text style={styles.emptyText}>You have no posts yet.</Text>
          ) : (
            <PostCard posts={userPosts} userPostScreen={true} />
          )}
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