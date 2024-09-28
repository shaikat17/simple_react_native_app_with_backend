
import AuthProvider from "./context/authContext";
import ScreenMenu from "./components/menus/ScreenMenu";
import { PostProvider } from "./context/postContext";
const RootNavigation = () => {
  return (
    <AuthProvider>
      <PostProvider>
      <ScreenMenu />
      </PostProvider>
    </AuthProvider>
  );
};
export default RootNavigation;
