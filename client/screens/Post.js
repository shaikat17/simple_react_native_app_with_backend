import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native";
import { useState } from "react";
import FooterMenu from "../components/menus/FooterMenu";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import authFetch from "../utils/authFetch";
import { usePostContext } from "../context/postContext";

const Post = ({ navigation }) => {
  // global state
  const { setPostStatusUpdate } = usePostContext();
  // local state
  const [loading, setLoading] = useState(false);
  const [postInformation, setPostInformation] = useState({
    title: "",
    description: "",
  });

  const insets = useSafeAreaInsets();

  // handle post submit
  const handlePostSubmit = async () => {
    try {
      setLoading(true);
      if (!postInformation.title || !postInformation.description) {
        Alert.alert("Validation Error", "All fields must be filled");
        setLoading(false);
        return;
      }
      if (postInformation.title.length < 5) {
        Alert.alert("Validation Error", "Title must be at least 5 characters long.");
        setLoading(false);
        return;
      }
      if (postInformation.description.length < 10) {
        Alert.alert("Validation Error", "Description must be at least 10 characters long.");
        setLoading(false);
        return;
      }

      const { data } = await authFetch.post("/posts/create-post", postInformation);
      setPostStatusUpdate(true);
      Alert.alert("Success", data.message);
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.heading}>Create a Post</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Add Post Title"
            onChangeText={(text) =>
              setPostInformation({ ...postInformation, title: text })
            }
            value={postInformation.title}
          />

          <TextInput
            style={styles.inputBox}
            placeholder="Add Post Description"
            multiline={true}
            numberOfLines={5}
            onChangeText={(text) =>
              setPostInformation({ ...postInformation, description: text })
            }
            value={postInformation.description}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.postBtn} onPress={handlePostSubmit}>
            <Text style={styles.btnText}>
              {loading ? "Please Wait" : "Create Post"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{ backgroundColor: "white" }}>
        <FooterMenu />
      </View>
    </View>
  );
};
export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    margin: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f90202e3",
    textDecorationLine: "underline",
  },
  inputBox: {
    backgroundColor: "#fff",
    marginTop: 30,
    padding: 10,
    width: 320,
    fontSize: 18,
    borderColor: "red",
    borderWidth: 0.5,
    borderRadius: 5,
    fontWeight: "bold",
    textAlignVertical: "top",
  },
  postBtn: {
    backgroundColor: "#000000e3",
    padding: 10,
    marginTop: 10,
    width: 200,
    borderRadius: 5,
    fontWeight: "bold",
    alignSelf: "center",
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "400",
  },
});
