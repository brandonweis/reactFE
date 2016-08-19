export default function attempts(state={
    isFetching: false,
    count: 3,
    results: []
}, change) {
    switch(change.type){
        case 'START_ATTEMPT':
            return {
                ...state,
                isFetching: true
            }
            break;
        case 'WAIT_ATTEMPT':
            return {
                ...state,
                isFetching: true
            }
            break;
        case 'SAVE_ATTEMPT_RESULT':
            return {
                ...state,
                isFetching: false,
                count: (--state.count),
                results: [...state.results, change.win]
            }
            break;
        case 'RESET_ATTEMPT_COUNT':
            return {
                ...state,
                isFetching: false,
                count: 3
            }
            break;
        default:
            return state
    }
}
