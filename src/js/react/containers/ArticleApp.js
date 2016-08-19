import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchArticles, eraseArticle } from '../actions'
import Articles from '../presentations/Articles'
import AddArticle from '../presentations/AddArticle'

export class ArticleApp extends Component {
    constructor(props) {
        super(props)
        // this.remove = this.remove.bind(this)
    }

    componentDidMount() {
        const { dispatch, selectedSubreddit } = this.props
        dispatch(fetchArticles())
        // this.startPolling()
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps.articles);
        // console.log(this.props.articles);
        // forceUpdate - By default, when your component's state or props change, your component will re-render. However, if these change implicitly (eg: data deep within an object changes without changing the object itself)
    }

    startPolling() {
        const { dispatch } = this.props
        const polling = () => {
            setTimeout(() => {
                dispatch(fetchArticles()).then(polling)
            }, 5000)
        }
        polling()
    }

    // remove(article) {
    //     // console.log(this);
    //     const { dispatch } = this.props
    //     return () => dispatch(eraseArticle(article))
    // }

    render() {
        const { articles, isFetching, lastUpdated, dispatch } = this.props
        articles.sort((a, b) => {
            return b.timestamp - a.timestamp
        })
        return (
            <div className='container'>
                <Articles articles={articles}/>
                <AddArticle/>
            </div>
        )
    }
}

ArticleApp.propTypes = {
    articles: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { articles: articleObj } = state
    const {
        isFetching,
        lastUpdated,
        items: articles
    } = articleObj || {
        isFetching: true,
        items: []
    }

    return {
        articles,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(ArticleApp)
