// Polyfills
import 'whatwg-fetch'

// Globals
global.React = require('react')
global.ReactDOM = require('react-dom')

import renderApp from './app.js'
import QuizStore from './stores/quiz'

const containerNode = document.getElementById(`container`)
const quizStore = new QuizStore()

function render() {
	ReactDOM.render(renderApp({ quizStore }), containerNode)
}

if (module.hot) {
	module.hot.accept('./app.js', () => {
		render()
	})
}

render()
