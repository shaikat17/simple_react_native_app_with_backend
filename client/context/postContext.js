
import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
import authFetch from "../utils/authFetch";


const PostContext = createContext()

export const PostProvider = ({ children }) => {
    const [loading, setLoading] = useState(false) 
    const [allPosts, setAllPosts] = useState([])
    const [postStatusUpdate, setPostStatusUpdate] = useState(false)
    const [userPosts, setUserPosts] = useState([])

    // get all posts
    const getPosts = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get('http://192.168.1.10:5000/api/v1/posts/get-posts')
            setAllPosts(data?.posts)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    //  get user posts
    const getUserPosts = async () => {
        try {
            setLoading(true)
            const { data } = await authFetch.get('/posts/get-user-posts')
            setUserPosts(data.posts)
            setLoading(false)
            setPostStatusUpdate(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
            alert(error.response.data.message || error)
        }
    }


    useEffect(() => {
        getPosts()
        getUserPosts()
        setPostStatusUpdate(false)
    }, [postStatusUpdate])

    return <PostContext.Provider value={{loading, setLoading, allPosts, setAllPosts, postStatusUpdate, setPostStatusUpdate, userPosts, getPosts}}>
        {children}
    </PostContext.Provider>
}

export const usePostContext = () => {
    return useContext(PostContext)
}