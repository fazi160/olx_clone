import { createContext, useState } from "react";

export const postContext=createContext()

const Post=({children})=>{
    const [post,setPost] = useState('')

    return(
        <postContext.Provider value={{post,setPost}}>
            {children}
        </postContext.Provider>
    )
}
export default Post