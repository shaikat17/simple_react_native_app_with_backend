import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useAuthContext } from "../context/authContext";
import FooterMenu from "../components/menus/FooterMenu";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePostContext } from "../context/postContext";
import PostCard from "../components/PostCard";

const Home = () => {
  // global state
  const { loading, allPosts } = usePostContext();

  const insets = useSafeAreaInsets();
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
          <PostCard posts={allPosts} />
      </ScrollView>
          <View style={{ backgroundColor: "white" }}>
          <FooterMenu />
      </View>
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    margin: 10,
  },
});
