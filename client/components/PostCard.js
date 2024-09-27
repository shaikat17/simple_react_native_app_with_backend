import { View, Text, StyleSheet, Alert } from 'react-native'
import moment from 'moment'
import { useState } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import authFetch from '../utils/authFetch'
import { usePostContext } from '../context/postContext'
import EditModal from './EditModal'

const PostCard = ({ posts, userPosts = false }) => {
    // global state
    const { setPostStatusUpdate } = usePostContext();
    // local state
    const [loading, setLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [singlePost, setSinglePost] = useState({})

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
          setLoading(false);
        } catch (error) {
          alert(error.response.data.message || error);
          setLoading(false);
          console.log(error);
        }
    }
    
  return (
    <View>
          <Text style={styles.heading}>Total Posts: {posts.length}</Text>
          {userPosts && <EditModal modalVisible={modalVisible} setModalVisible={setModalVisible} post={singlePost} />}
          {posts?.map((post, index) => (
              <View style={styles.card} key={index}>
                  {userPosts && <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                      {/* for edit post */}
                      <FontAwesome5 name='pen' style={[styles.iconStyle, { fontSize: 18, marginRight: 20 }]} onPress={() => { setSinglePost(post); setModalVisible(true)}} />
                      {/* for delete post */}
                      <FontAwesome5 name='trash' style={[styles.iconStyle, { fontSize: 18}]}  onPress={() => deletePrompt(post._id)}/>
                  </View> }
                  <Text style={styles.postTitle}>Title: {post.title}</Text>
                  <Text style={styles.postDescription}>{post.description}</Text>
                  <View style={styles.postFooter}>
                      
                      <View style={styles.footerAuthor}>
                          <FontAwesome5 name='user' style={styles.iconStyle} />
                          <Text style={styles.footerAuthorNameDate}>{post?.author.name}</Text>
                          </View>
                      <View style={styles.footerDate}>
                      <FontAwesome5 name='clock' style={styles.iconStyle} />
                          <Text style={styles.footerAuthorNameDate}>
                          {moment(post?.createdAt).format('DD:MM:YYYY')}
                          </Text>
                      </View>
                  </View>
              </View>
          ))}
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
        color: 'red',
        textAlign: 'center',
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
        fontSize: 16,
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
    }
})