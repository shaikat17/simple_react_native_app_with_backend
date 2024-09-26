import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create an axios instance
const authFetch = axios.create({
  baseURL: 'http://192.168.1.10:5000/api/v1',
});

// Function to get the token from AsyncStorage
const getToken = async () => {
  try {
      let data = await AsyncStorage.getItem("@auth");
      data = JSON.parse(data);
    return data.token;
  } catch (error) {
    console.log("Error retrieving token from AsyncStorage:", error);
    return null;
  }
};

// Axios request interceptor to add the token dynamically
authFetch.interceptors.request.use(
  async (config) => {
    const token = await getToken(); // Dynamically get the token from AsyncStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


  // axios response interceptor
//   authFetch.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     (error) => {
//       if (error.response.status === 401) {
//         logoutUser()
//       }
//       return Promise.reject(error);
//     }
//   );

  export default authFetch