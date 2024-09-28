import { View, Text, StyleSheet, Image } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import moment from 'moment'


const CommentCard = ({ item }) => {
  return (
    <View style={styles.commentCard}>
                  <View style={styles.authorContainer}>
                    <View style={styles.author}>
                      {item.userId.avatar ? (
                        <Image
                          source={{ uri: item.userId.avatar }}
                          style={{ width: 30, height: 30, borderRadius: 15, marginRight: 10 }}
                        />
                      ) : (
                        <FontAwesome5 name="user" style={styles.iconStyle} />
                      )}
                      <Text style={styles.authorName}>{item.userId.name}</Text>
                    </View>
                    <View style={styles.date}>
                      <FontAwesome5 name="clock" style={styles.iconStyle} />
                      <Text style={styles.footerAuthorNameDate}>
                        {moment(item.createdAt).format("DD:MM:YYYY")}
                      </Text>
                    </View>
                  </View>
      
                  <Text style={styles.comment}>{item.comment}</Text>
                </View>
  )
}
export default CommentCard

const styles = StyleSheet.create({
  commentCard: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "white",
    borderRadius: 5,
    borderBottomWidth: 0.5,
      borderBottomColor: "red",
    paddingVertical: 20,
  },
  authorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  author: {
    flexDirection: "row",
      alignItems: "center",
    borderBottomColor: "red",
      borderBottomWidth: 0.5,
    paddingBottom: 5,
  },
  authorName: {
    fontWeight: "bold",
  },
  comment: {
    fontSize: 16,
  },
  iconStyle: {
    fontSize: 18,
    marginRight: 8,
    fontWeight: "bold",
    color: "red",
  },
  date: {
    flexDirection: "row",
      alignItems: "center",
    borderBottomColor: "red",
      borderBottomWidth: 0.5,
    paddingBottom: 5,
  },
  footerAuthorNameDate: {
    fontWeight: "bold",
  },
});