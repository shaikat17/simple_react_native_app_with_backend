import { View, Text } from "react-native";
import AuthProvider from "./context/authContext";
import ScreenMenu from "./components/menus/ScreenMenu";
import { PaperProvider } from "react-native-paper";
const RootNavigation = () => {
  return (
    <AuthProvider>
      <PaperProvider>
        <ScreenMenu />
      </PaperProvider>
    </AuthProvider>
  );
};
export default RootNavigation;
