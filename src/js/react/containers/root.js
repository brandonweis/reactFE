import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from "../store"
import ArticleApp from './ArticleApp'

const store = configureStore()

store.subscribe(() => {
    console.log("message", store.getState());
})

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <ArticleApp />
      </Provider>
    )
  }
}
