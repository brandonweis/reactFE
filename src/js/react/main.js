import { Router, Route, Link } from 'react-router'
import { hashHistory } from 'react-router'
import React from 'react'
import { render } from 'react-dom'
// import { App, randomNumber} from './view'
import Root from './containers/root'

import '../../style/style.scss'

const body = document.getElementById('react')

render(
  <Root />,
  body
)

// // this is where you define the routes
// render((
//     <Router history={ hashHistory }>
//         <Route path="/" component={ App }>
//             <Route path="randomNumber" component={ randomNumber } />
//         </Route>
//     </Router>
// ), body)
