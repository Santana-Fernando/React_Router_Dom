import * as types from './types'

export const reducer = (state, action) => {
    switch (action.type) {
        case types.POSTS_SUCCESS:
            return {...state, posts: action.payload, loading: false}
        
        case types.POSTS_LOADING:
            return {...state, loading: true}
        
        default:
            console.log("Não há ", action.type)
    }

    return {...state}
}