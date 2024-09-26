
import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";


const PostContext = createContext()

export const PostProvider = ({ children }) => {
    const [loading, setLoading] = useState(false) 
    const [allPosts, setAllPosts] = useState([])

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

    useEffect(() => {
        getPosts()
    }, [])

    return <PostContext.Provider value={{loading, setLoading, allPosts, setAllPosts}}>
        {children}
    </PostContext.Provider>
}

export const usePostContext = () => {
    return useContext(PostContext)
}