import Promise from 'promise'
import FormData from 'form-data'
require('es6-promise').polyfill();
import 'isomorphic-fetch';

function deleteArticle(){
    return {
        type: "DELETE_ARTICLE",
    }
}
function removeArticle(article){
    return {
        type: "REMOVE_ARTICLE",
        article
    }
}
function postArticle(){
    return {
        type: "POST_ARTICLES",
    }
}
function addArticle(article){
    return {
        type: "ADD_ARTICLE",
        article
    }
}
function requestArticles(){
    return {
        type: "REQUEST_ARTICLES",
    }
}
function receiveArticles(articles){
    return {
        type: "RECEIVE_ARTICLES",
        articles,
        receivedAt: Date.now()
    }
}
export function fetchArticles() {
    console.log("fetching articles");
    return dispatch => {
        dispatch(requestArticles())
        return fetch(`/articles`, {
            method: `GET`
        })
        .then(response => response.json())
        .then(json => {
            dispatch(receiveArticles(json))
            return Promise.resolve()
        })
    }
}
export function createArticle(article) {
    return dispatch => {
        dispatch(postArticle())
        return fetch(`/articles`, {
            method: 'POST',
            body: `header=${article.header}&content=${article.content}`,
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            }
        })
        .then(response => {
            if(response.status === 200){
                dispatch(addArticle(article))
                return Promise.resolve()
            }
            else{
                return Promise.reject()
            }
        })
    }
}
export function eraseArticle(article) {
    return dispatch => {
        dispatch(deleteArticle())
        return fetch(`/articles/${article.id}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Request-Method': 'DELETE'
            }
        })
        .then(response => {
            if(response.status === 200){
                dispatch(removeArticle(article))
                return Promise.resolve()
            }
            else{
                return Promise.reject()
            }
        })
    }
}
