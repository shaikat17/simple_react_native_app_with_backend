import { View, Text } from 'react-native'
import AuthProvider from './context/authContext'
import ScreenMenu from './components/menus/ScreenMenu'
const RootNavigation = () => {
  return (
    <AuthProvider>
      <ScreenMenu />
    </AuthProvider>
  )
}
export default RootNavigation