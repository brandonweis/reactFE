import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'
import { reduxStore } from './state'
import * as actions from './actions'

export const App = React.createClass({
    render() {
        return (
          <div>
            <div id="menu">
                <ul>
                    <span>
                    <li><Link to="/randomNumber">Random Number</Link></li>
                    </span>
                </ul>
            </div>
            <div id="container">
                <div id="content">
                    {this.props.children}
                </div>
            </div>
          </div>
        )
    }
})

export const randomNumber = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            win: false,
            error: false,
            message: null,
            className: ''
        }
    },

    onSubmit(event) {
        event.preventDefault()
        const guessNumber = parseInt(this.refs.guessNumber.value)
        if(isNaN(guessNumber)) return this.setState({error: true, message: "Nope! Not a number", className: 'denied'})

        this.setState({className: 'loading'})
        reduxStore.dispatch(actions.guess(guessNumber))
        .then(() => {
            let results = reduxStore.getState().attempts.results
            let result = results[results.length-1]
            if(result) return this.setState({win: true, error:false, message: "You guessed it right!", className: 'granted'})
            throw new Error("Nope! Try again with a number range 0 - 999")
        })
        .catch(error => {
            this.setState({win:false, error: true, message: error.message, className: 'denied'})
        })
    },

    render() {
        let groups = reduxStore.getState().groups || [];
        return (
            <div>
                <h3>Guess Random Number</h3>
                <p>You only have {reduxStore.getState().attempts.count} attempt(s)</p>
                <form onSubmit={this.onSubmit}>
                    <label><input type="text" ref="guessNumber" placeholder="Guess a Number between 0 to 999"/></label>
                    <br/>
                    <button className={this.state.className} type="submit">Guess</button>
                    { (this.state.error || this.state.win) && (
                    <p className={this.state.error?'error':''}>{ this.state.message }</p>
                    )}
                </form>
                <p>Hints: predefined numbers are 1, 456, 999</p>
            </div>
        )
    }
})
