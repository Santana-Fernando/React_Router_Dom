import { PostsContext } from "./context"
import P from 'prop-types'
import { useReducer } from "react"
import { reducer } from "./reducer";
import { data } from "./data";

export const PostsProvider = ({children}) => {
    const [postsState, postDspatch] = useReducer(reducer, data);

    return <PostsContext.Provider value={{ postsState, postDspatch }}>{children}</PostsContext.Provider>
}

PostsProvider.prototype = {
    children: P.node.isRequired
}