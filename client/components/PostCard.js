import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import moment from "moment";
import { useState } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import authFetch from "../utils/authFetch";
import { usePostContext } from "../context/postContext";
import EditModal from "./EditModal";
import { useNavigation } from "@react-navigation/native";
import SinglePost from "./SinglePost";

const PostCard = ({ posts, userPostScreen = false }) => {
  const { setPostStatusUpdate, allPosts, userPosts } = usePostContext();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [singlePost, setSinglePost] = useState({});
  
  const navigation = useNavigation();

  // Delete post prompt
  const deletePrompt = (id) => {
    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
      },
      { text: "OK", onPress: () => handleDeletePost(id) },
    ]);
  };

  // Delete post function
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
        posts?.map((post) => (
          <SinglePost key={post._id} post={post} setModalVisible={setModalVisible} setSinglePost={setSinglePost} userPostScreen={userPostScreen} />
        ))
      )}
    </View>
  );
};

export default PostCard;

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
