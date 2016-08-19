import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createArticle } from '../actions'

class AddArticle extends Component {
    render() {
        let { dispatch } = this.props
        let header, content
        return (
            <div className='addArticle'>
                <h2>New Article</h2>
                <form onSubmit={ e => {
                    e.preventDefault()
                    if (!header.value.trim() || !content.value.trim()) {
                        return
                    }
                    dispatch(createArticle({header:header.value, content:content.value }))
                    header.value = content.value = ''
                }}>
                <label><input type="text" ref={node => header=node } placeholder="Header"/></label>
                <br/>
                <label><textarea ref={node => content=node } placeholder="Content"></textarea></label>
                <br/>
                <button type="submit">Add</button>
                </form>
            </div>
        )
    }
}

AddArticle = connect()(AddArticle)

export default AddArticle
