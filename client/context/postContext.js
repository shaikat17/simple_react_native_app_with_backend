
import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
import authFetch from "../utils/authFetch";
import { useAuthContext } from "./authContext";


const PostContext = createContext()

export const PostProvider = ({ children }) => {

    // global states 
    const { state } = useAuthContext()
    const [loading, setLoading] = useState(false) 
    const [allPosts, setAllPosts] = useState([])
    const [postStatusUpdate, setPostStatusUpdate] = useState(false)
    const [userPosts, setUserPosts] = useState([])

    // get all posts
    const getPosts = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('http://192.168.1.10:5000/api/v1/posts/get-posts');
            setAllPosts(data?.posts);
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || 'Failed to fetch posts');
        } finally {
            setLoading(false);
        }
    };

    //  get user posts
    const getUserPosts = async () => {
        if (!state?.user) return; // Early return if no user
        setLoading(true);
        try {
            const { data } = await authFetch.get('/posts/get-user-posts');
            setUserPosts(data.posts);
        } catch (error) {
            console.log("🚀 ~ getUserPosts ~ error:", error);
            alert(error.response?.data?.message || 'Failed to fetch user posts');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const fetchPosts = async () => {
            await getPosts();
            if (state?.user) {
                await getUserPosts();
            }
            setPostStatusUpdate(false);
        };

        fetchPosts();
    }, [postStatusUpdate, state?.user]);

    return <PostContext.Provider value={{loading, setLoading, allPosts, setAllPosts, postStatusUpdate, setPostStatusUpdate, userPosts, getPosts, getUserPosts, setUserPosts}}>
        {children}
    </PostContext.Provider>
}

export const usePostContext = () => {
    return useContext(PostContext)
}