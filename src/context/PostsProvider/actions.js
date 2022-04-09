import * as types from './types'

export const loadPosts = async (dispatch) => {

    dispatch({type: types.POSTS_LOADING})

    let posts = []
    await fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(json => posts = json)
    console.log(posts.length)
    
    return () => dispatch({type: types.POSTS_SUCCESS, payload: posts})
}