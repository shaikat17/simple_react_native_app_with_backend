import { View, Text, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import moment from 'moment'
import { useState } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import authFetch from '../utils/authFetch'
import { usePostContext } from '../context/postContext'
import EditModal from './EditModal'
import { useAuthContext } from '../context/authContext'
import { useNavigation } from '@react-navigation/native'

const PostCard = ({ posts, userPostScreen = false }) => {
    // global state
  const { setPostStatusUpdate, allPosts, userPosts } = usePostContext();
  const { state } = useAuthContext();

    // local state
    const [loading, setLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
  const [singlePost, setSinglePost] = useState({})

  const navigation = useNavigation()

    // delete prompt
    const deletePrompt = (id) => {
        Alert.alert(
            "Delete Post",
            "Are you sure you want to delete this post?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                },
                { text: "OK", onPress: () => handleDeletePost(id) },
            ]
        )
    }

    // delete post function
    const handleDeletePost = async (id) => {
    try {
      setLoading(true);
      const { data } = await authFetch.delete(`/posts/delete-post/${id}`);
      setPostStatusUpdate(true);
      alert(data.message);
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
      console.error("Delete post error:", error);
    } finally {
      setLoading(false);
    }
    };
    
    const renderPostCard = (post) => (
        <View style={styles.card} key={post._id}>
          {userPostScreen && (
            <View style={styles.editDeleteIcons}>
              <FontAwesome5
                name='pen'
                style={[styles.iconStyle, { marginRight: 20 }]}
                onPress={() => {
                  setSinglePost(post);
                  setModalVisible(true);
                }}
                accessibilityLabel="Edit post"
              />
              <FontAwesome5
                name='trash'
                style={styles.iconStyle}
                onPress={() => deletePrompt(post._id)}
                accessibilityLabel="Delete post"
              />
            </View>
          )}
          <Text style={styles.postTitle}>Title: {post.title}</Text>
        <Text style={styles.postDescription}>{post.description.length > 100 ? `${post.description.substring(0, 100)}...` : post.description}
          
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('FullPost', { post })} style={styles.readMoreButton}>
                <Text style={styles.readMoreText}>Read More</Text>
            </TouchableOpacity>
          <View style={styles.postFooter}>
          <View style={styles.footerAuthor}>
            
              {post?.author?.avatar ? (
                <Image
                  source={{ uri: post.author.avatar }}
                  style={{ width: 20, height: 20, borderRadius: 25, marginRight: 10 }}
                />
            ) : (
              <FontAwesome5 name='user' style={styles.iconStyle} />
              )}
              <Text style={styles.footerAuthorNameDate}>{post.author.name}</Text>
            </View>
            <View style={styles.footerDate}>
              <FontAwesome5 name='clock' style={styles.iconStyle} />
              <Text style={styles.footerAuthorNameDate}>
                {moment(post.createdAt).format('DD:MM:YYYY')}
              </Text>
            </View>
          </View>
        </View>
      );
    
  return (
    <View>
    <View style={styles.postCountContainer}>
      <Text style={styles.heading}>Total Posts: {allPosts.length}</Text>
      <Text style={styles.heading}>Your Posts: {userPosts.length}</Text>
    </View>
    {userPostScreen && (
      <EditModal 
        modalVisible={modalVisible} 
        setModalVisible={setModalVisible} 
        post={singlePost} 
      />
    )}
    {loading ? (
      <ActivityIndicator size="large" color="#ea2222" />
    ) : (
      posts?.map(renderPostCard)
    )}
  </View>
  )
}
export default PostCard

const styles = StyleSheet.create({
    card: {
      width: '100%',
      backgroundColor: '#fff',
      borderWidth: 0.2,
      borderColor: 'red',
      padding: 20,
      borderRadius: 5,
      marginVertical: 10,
    },
    heading: {
      color: '#363434',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 20,
    },
    postCountContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      fontWeight: 'bold',
    },
    postTitle: {
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: 10,
      borderBottomColor: 'red',
      borderBottomWidth: 0.5,
    },
    postDescription: {
      fontSize: 16,
    },
    postFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      alignItems: 'center',
    },
    footerAuthor: {
      flexDirection: 'row',
      alignItems: 'center',
      borderTopColor: 'red',
      borderTopWidth: 0.5,
      paddingTop: 5,
    },
    iconStyle: {
      fontSize: 18,
      marginRight: 8,
      fontWeight: 'bold',
      color: 'red',
    },
    footerAuthorNameDate: {
      fontWeight: 'bold',
    },
    footerDate: {
      flexDirection: 'row',
      alignItems: 'center',
      borderTopColor: 'red',
      borderTopWidth: 0.5,
      paddingTop: 5,
    },
    editDeleteIcons: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
  },
  readMoreButton: {
    marginTop: 10,
    padding: 8,
    width: 80,
    backgroundColor: 'red',
    borderRadius: 5,
    alignItems: 'center',
},
readMoreText: {
    color: '#fff',
    fontWeight: 'bold',
},
  });