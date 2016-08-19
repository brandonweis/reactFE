import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { eraseArticle } from '../actions'

export default class Articles extends Component {
    render() {
        console.log(this.props);
        let { dispatch } = this.props
        return (
        <div className='articles'>
            <h2>Articles of Today</h2>
            <ul>
            {this.props.articles.map((article, i) =>
                <li key={i}>
                    <img src={'http://lorempixum.com/100/100/nature/1'}/>
                    <h3>{article.header}</h3>
                    <p>{article.content}</p>
                    <input type="button" onClick={() => dispatch(eraseArticle(article))} value="Remove" />
                </li>
            )}
            </ul>
        </div>
        )
    }
}

Articles.propTypes = {
    articles: PropTypes.array.isRequired
}

Articles = connect()(Articles)

export default Articles
