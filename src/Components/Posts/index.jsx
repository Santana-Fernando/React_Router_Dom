import { useContext, useEffect, useRef } from "react"
import { CounterContext } from "../../context/CounterProvider/context"
import { loadPosts } from "../../context/PostsProvider/actions" 
import { incrementCounter, decrementDecrement } from "../../context/CounterProvider/actions" 
import { PostsContext } from "../../context/PostsProvider/context"

export const Posts = () => {
    const isMounted = useRef(true)
    const postsContext = useContext(PostsContext)
    const { postDspatch, postsState } = postsContext
    
    const counterContext = useContext(CounterContext)
    const { counterState, counterDispatch } = counterContext

    console.log(isMounted.current)

    useEffect(() => {
        loadPosts(postDspatch).then(dispatch => {
            if(isMounted.current) {
                dispatch()
            }

            return () => {
                isMounted.current = false
            }
        })
    }, [postDspatch])

    console.log(postsState)
    return (
        <div>
            <button onClick={() => decrementDecrement(counterDispatch) }>-</button>
            <p>Counter {counterState.counter}</p>
            <button onClick={() => incrementCounter(counterDispatch) }>+</button>
            <h1>Posts</h1>
            {postsState.loading && (<p><strong>Carregando posts...</strong></p>)}
            {!postsState.loading && postsState.posts.map(p => <p key={p.key}> {p.title}</p>)}
        </div>
    )
}