import { View, Text, StyleSheet } from 'react-native'
import moment from 'moment'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const PostCard = ({ posts }) => {
  return (
    <View>
          <Text style={styles.heading}>Total Posts: {posts.length}</Text>
          {posts?.map((post, index) => (
              <View style={styles.card} key={index}>
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