import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text,
  RefreshControl,
} from "react-native";
import { useState } from "react";
import FooterMenu from "../components/menus/FooterMenu";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePostContext } from "../context/postContext";
import PostCard from "../components/PostCard";

const Home = () => {
  // global state
  const { loading, allPosts, getPosts } = usePostContext();

  // local state
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await getPosts();
    setRefreshing(false);
  };

  const insets = useSafeAreaInsets();

  if (!loading && allPosts.length === 0) {
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
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          } >
          <Text style={styles.emptyMessage}>No posts available.</Text>
        </ScrollView>
      </View>
    );
  }
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
      {loading ? (
        <ActivityIndicator
          style={styles.loadingIndicator}
          size="large"
          color="#ea2222"
        />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {allPosts.length > 0 ? (
            <PostCard posts={allPosts} />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyMessage}>No posts available.</Text>
            </View>
          )}
        </ScrollView>
      )}

      <View style={styles.footerContainer}>
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
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
  },
  footerContainer: {
    backgroundColor: "white",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyMessage: {
    fontSize: 18,
    color: "#777",
  },
});
