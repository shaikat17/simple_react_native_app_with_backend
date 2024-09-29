import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import moment from "moment";
import { useState } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import authFetch from "../utils/authFetch";
const SinglePost = ({ post, userPostScreen, setModalVisible, setSinglePost, deletePrompt }) => {

    // local state
    const [likedByUser, setLikedByUser] = useState(post.isLikedByUser || false);
    const [totalLikes, setTotalLikes] = useState(post.totalLikes || 0);
    const navigation = useNavigation()

      // Post like function
  const handleLikePost = async (post) => {
    try {
      // Update the server with the new like status
      const { data } = await authFetch.put(`/posts/${post._id}/like`);

      // Update local state for liked status
      post.isLikedByUser = !post.isLikedByUser; // Toggle the like state
        post.totalLikes = data.totalLikes; // Update total likes from the server response

        setLikedByUser(post.isLikedByUser);
        setTotalLikes(post.totalLikes);
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
      console.error("Like post error:", error);
    }
  };
    
  return (
    <View style={styles.card} key={post._id}>
      {userPostScreen && (
        <View style={styles.editDeleteIcons}>
          <FontAwesome5
            name="pen"
            style={[styles.iconStyle, { marginRight: 20 }]}
            onPress={() => {
              setSinglePost(post);
              setModalVisible(true);
            }}
            accessibilityLabel="Edit post"
          />
          <FontAwesome5
            name="trash"
            style={styles.iconStyle}
            onPress={() => deletePrompt(post._id)}
            accessibilityLabel="Delete post"
          />
        </View>
      )}
      {!userPostScreen && (
        <View style={styles.authorContainer}>
          <Text
            style={[
              styles.authorName,
              {
                borderBottomColor: "red",
                borderBottomWidth: 0.5,
                paddingBottom: 5,
              },
            ]}
          >
            Posted By:{" "}
          </Text>
          <View style={styles.author}>
            {post?.author?.avatar ? (
              <Image
                source={{ uri: post.author.avatar }}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 25,
                  marginRight: 10,
                }}
              />
            ) : (
              <FontAwesome5 name="user" style={styles.iconStyle} />
            )}
            <Text style={styles.footerAuthorNameDate}>{post.author.name}</Text>
          </View>
        </View>
      )}
      <Text style={styles.postTitle}>Title: {post.title}</Text>
      <Text style={styles.postDescription}>
        {post.description.length > 100
          ? `${post.description.substring(0, 100)}...`
          : post.description}
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("FullPost", { post })}
        style={styles.readMoreButton}
      >
        <Text style={styles.readMoreText}>Read More</Text>
      </TouchableOpacity>
      <View style={styles.postFooter}>
        <View style={styles.footerStats}>
          <TouchableOpacity onPress={() => handleLikePost(post)}>
            <FontAwesome5
              name="heart"
              solid={likedByUser} // Solid if liked
              style={styles.iconStyle}
            />
          </TouchableOpacity>
          <Text>{totalLikes} Likes</Text>
        </View>
        <View style={styles.footerDate}>
          <FontAwesome5 name="comment" style={styles.iconStyle} />
          <Text style={styles.footerAuthorNameDate}>
            {post.commentsCount} Comments
          </Text>
        </View>
        <View style={styles.footerDate}>
          <FontAwesome5 name="clock" style={styles.iconStyle} />
          <Text style={styles.footerAuthorNameDate}>
            {moment(post.createdAt).format("DD:MM:YYYY")}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default SinglePost;

const styles = StyleSheet.create({
    card: {
      width: "100%",
      backgroundColor: "#fff",
      borderWidth: 0.2,
      borderColor: "red",
      padding: 20,
      borderRadius: 5,
      marginVertical: 10,
    },
    heading: {
      color: "#363434",
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 20,
    },
    postCountContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      fontWeight: "bold",
    },
    postTitle: {
      fontWeight: "bold",
      fontSize: 18,
      marginBottom: 10,
      borderBottomColor: "red",
      borderBottomWidth: 0.5,
    },
    postDescription: {
      fontSize: 16,
    },
    postFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
      alignItems: "center",
    },
    footerStats: {
      flexDirection: "row",
      alignItems: "center",
      borderTopColor: "red",
      borderTopWidth: 0.5,
      paddingTop: 5,
    },
    iconStyle: {
      fontSize: 18,
      marginRight: 8,
      fontWeight: "bold",
      color: "red",
    },
    footerAuthorNameDate: {
      fontWeight: "bold",
    },
    footerDate: {
      flexDirection: "row",
      alignItems: "center",
      borderTopColor: "red",
      borderTopWidth: 0.5,
      paddingTop: 5,
    },
    editDeleteIcons: {
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    readMoreButton: {
      marginTop: 10,
      padding: 8,
      width: 80,
      backgroundColor: "red",
      borderRadius: 5,
      alignItems: "center",
    },
    readMoreText: {
      color: "#fff",
      fontWeight: "bold",
    },
    authorContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
      fontSize: 16,
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
  });