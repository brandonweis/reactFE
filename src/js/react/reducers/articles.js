export default function articles(state={
    isPosting: false,
    isFetching: false,
    items: []
}, action) {
    switch(action.type){
        case 'DELETE_ARTICLE':
        return {
            ...state,
            isPosting: true
        }
        break;
        case 'REMOVE_ARTICLE':
        return {
            ...state,
            items: state.items.filter(item => item !== action.article),
            isPosting: false
        }
        break;
        case 'POST_ARTICLE':
            return {
                ...state,
                isPosting: true
            }
            break;
        case 'ADD_ARTICLE':
            return {
                ...state,
                items: [action.article, ...state.items],
                isPosting: false
            }
            break;
        case 'REQUEST_ARTICLES':
            return {
                ...state,
                isFetching: true
            }
            break;
        case 'RECEIVE_ARTICLES':
            return {
                ...state,
                isFetching: false,
                items: action.articles,
                lastUpdated: action.receivedAt
            }
            break;
        default:
            return state
    }
}
