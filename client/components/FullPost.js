import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../context/authContext";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import moment from "moment";

const FullPost = () => {
  // global state
  const { state } = useAuthContext();
  const route = useRoute();
  const { post } = route.params; // Get the post data from params

  const navigation = useNavigation();

  // Set the header title to the post title
  useEffect(() => {
    navigation.setOptions({ title: post.title });
  }, [navigation, post.title]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.description}>{post.description}</Text>

        <View style={styles.postFooter}>
          <View style={styles.footerAuthor}>
            {state?.user?.avatar && state?.user?.name === post.author.name ? (
              <Image
                source={{ uri: state.user.avatar }}
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
          <View style={styles.footerDate}>
            <FontAwesome5 name="clock" style={styles.iconStyle} />
            <Text style={styles.footerAuthorNameDate}>
              {moment(post.createdAt).format("DD:MM:YYYY")}
            </Text>
          </View>
              </View>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button} >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Back to Posts</Text>
                </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
        backgroundColor: "white",
    marginHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    marginVertical: 10,
    fontSize: 16,
    textAlign: "justify",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#f92d2d",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerAuthor: {
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
});

export default FullPost;
