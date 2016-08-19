import { combineReducers } from 'redux'
import articles from './reducers/articles'

export default combineReducers({
  articles,
  // state reducer to be added here, for state scalability
})
