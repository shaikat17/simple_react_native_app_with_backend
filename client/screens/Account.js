import { View, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native'
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
import * as ImagePicker from 'expo-image-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const Account = () => {
  // global state
    const { state, setState } = useAuthContext()
    
    const [userInformation, setUserInformation] = useState({
        name: state?.user?.name || "",
      email: state?.user?.email || "",   
        avatar: null
    })
    const [loading, setLoading] = useState(false)

    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    
  // handle image upload
  const handleImageUpload = async () => {
    // Request permissions to access the image library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      

      if (!result.cancelled) {
        // Update the state with the selected image URI
        setUserInformation({ ...userInformation, avatar: result.assets[0].uri });
      }
    } else {
      Alert.alert("Permission to access camera roll is required!");
    }
  };

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
          
          // Prepare form data for the image upload
      const formData = new FormData();
          if (userInformation.avatar) {
        formData.append('avatar', {
          uri: userInformation.avatar,
          type: 'image/jpeg', // adjust based on your image type
          name: 'avatar.jpg', // or a dynamic name
        });
      }

      // Append other user info
      formData.append('name', userInformation.name);
      formData.append('email', userInformation.email);

          console.log(formData._parts[0][1])  
      // Make the API request
      const { data } = await authFetch.post('/auth/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data) {
        setState({ ...state, user: data.user || state.user });
        Alert.alert(data.message);
        navigation.navigate('Home');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong.";
      Alert.alert(errorMessage);
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
        <TouchableOpacity onPress={handleImageUpload}>
            {userInformation.avatar ? (
              <Image source={{ uri: userInformation.avatar }} style={{ width: 100, height: 100 }} />
            ) : (
              <Image source={{ uri: 'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png' }} style={{ width: 100, height: 100 }} />
            )}
          </TouchableOpacity>
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
  },
  
})