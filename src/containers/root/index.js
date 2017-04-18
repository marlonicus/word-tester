import { Route } from 'react-router-dom'
import { Component } from 'react'
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import Root from '../../components/templates/root'
import DonateContainer from '../donate'
import QuizContainer from '../quiz'

export default class RootContainer extends Component {
	render() {
		return (
			<Root>
				{ this.props.children }
			</Root>
		)
	}
}
