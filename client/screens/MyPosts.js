import { View, Text, StyleSheet, ScrollView } from 'react-native'
import {
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useState, useEffect } from 'react'
import FooterMenu from '../components/menus/FooterMenu'
import authFetch from '../utils/authFetch';
import PostCard from '../components/PostCard';
const MyPosts = () => {
    const insets = useSafeAreaInsets();

    // local state
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)

    //  get user posts
    const getUserPosts = async () => {
        try {
            setLoading(true)
            const { data } = await authFetch.get('/posts/get-user-posts')
            setPosts(data.posts)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
            alert(error.response.data.message || error)
        }
    }

    useEffect(() => {
        getUserPosts()
    }, [])

  return (
      <View style={[styles.container, {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
      }]}>
          <ScrollView>
          <PostCard posts={posts} />
          </ScrollView>
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