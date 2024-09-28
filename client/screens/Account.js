import { View, StyleSheet, Image } from 'react-native'
import authFetch from '../utils/authFetch';
import {useState} from 'react'
import { useAuthContext } from '../context/authContext'
import FooterMenu from '../components/menus/FooterMenu'
import {
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import InputField from '../components/forms/InputField';
import SubmitButton from '../components/forms/SubmitButton';
import { useNavigation } from '@react-navigation/native';


const Account = () => {
  // global state
    const { state, setState } = useAuthContext()
    
    const [userInformation, setUserInformation] = useState({
        name: state?.user?.name || "",
        email: state?.user?.email || "",    
    })
    const [loading, setLoading] = useState(false)

    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    
    // update user function
    const handleSubmit = async () => {
        try {
          setLoading(true);
          
          // Validate required fields
          if (!userInformation.name || !userInformation.email) {
            alert("Oops!!! All fields must be filled.");
            return;
          }
          
          // Simple email format validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(userInformation.email)) {
            alert("Please enter a valid email address.");
            return;
          }
          
          // Make the API request
          const { data } = await authFetch.post("/auth/update", { ...userInformation });
          
          // Check if the response data is valid
          if (data) {
            setState({ ...state, user: data.user || state.user });
            alert(data.message);
            navigation.navigate('Home');
          }
        } catch (error) {
          // Gracefully handle potential errors
          const errorMessage = error.response?.data?.message || "Something went wrong.";
          alert(errorMessage);
          console.log("🚀 ~ handleSubmit Account  ~ error:", error);
        } finally {
          setLoading(false);
        }
      };

return (
    <View style={[styles.container, {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
  }]}>
        <View>
        <View style={styles.ImgContainer}>
            <Image source={{uri: 'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png'}} style={{width: 100, height: 100}} />
        </View>
        <View style={styles.inputContainer}>
        <InputField
          label={"name"}
          keyboardType={"text"}
          autoComplete={"name"}
                    value={userInformation.name}
                    setValue={setUserInformation}
                    customStyles={{fontWeight: 'bold', color: 'orange', fontSize: 18, borderColor: 'red', borderWidth: 0.5}}
        />
        <InputField
          label={"email"}
          keyboardType={"email-address"}
          autoComplete={"email"}
                    value={userInformation.email}
                    setValue={setUserInformation}
                    customStyles={{fontWeight: 'bold', color: 'orange', fontSize: 18, borderColor: 'red', borderWidth: 0.5}}
                />
                <InputField
          label={"User Role"}
          keyboardType={"text"}
                    value={state?.user?.role}
                    editable={false}
                    customStyles={{fontWeight: 'bold', color: 'orange', fontSize: 18, borderColor: 'red', borderWidth: 0.5}}
        />
        </View>
            <SubmitButton btnTitle={"Update"} loading={loading} handleSubmit={handleSubmit}  />
        </View>
        <View style={{ backgroundColor: "white" }}>
          <FooterMenu />
      </View>
  </View>
  )
}
export default Account

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        margin: 10,
        
    },
    ImgContainer: {
        alignItems: 'center'
    },
    inputContainer: {
        marginTop: 10,
    }
})