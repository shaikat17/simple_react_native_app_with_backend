import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import authFetch from "../utils/authFetch";
import axios from "axios";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import moment from "moment";
import CommentCard from "./CommentCard";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
      try {
        setLoading(true);
      const { data } = await axios.get(
        `http://192.168.1.10:5000/api/v1/posts/get-comments/${postId}`
      );
      setComments(data.comments);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setLoading(false);
    }
  };
    
  useEffect(() => {
   
    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
      try {
          setLoading(true);
          if (!commentText) {
              Alert.alert("Error", "Please write something before commenting");
              return;
          }
      const { data } = await authFetch.post("/posts/add-comment", {
        postId,
        comment: commentText,
      });
        fetchComments();
        setCommentText("");
        Alert.alert("Success", data.message);
    } catch (error) {
      console.error("Failed to add comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
          <View style={{backgroundColor: "white", padding: 10}}>
          <Text style={styles.heading}>Total Comments: {comments.length}</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a comment..."
        value={commentText}
        onChangeText={(text) => setCommentText(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddComment}>
        <Text style={{ color: "white" }}>Add Comment</Text>
      </TouchableOpacity>
      </View>

          {loading ? (  <ActivityIndicator style={styles.loadingIndicator} size="large" color="#ea2222" />) : (
              <View>
                  {comments.map((comment) => (
                  <CommentCard key={comment._id} item={comment} />
              ))}
              </View>
          )}
      
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
    marginHorizontal: 10,
    marginTop: 10,
    borderTopColor: "red",
        borderTopWidth: 0.5,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    height: 40,
    marginBottom: 10,
      paddingHorizontal: 10,
      borderColor: "red",
      borderWidth: 0.5,
      borderRadius: 5,
      fontWeight: "bold",
      borderTopWidth: 0,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#f92d2d",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
});
