import { Component } from 'react'
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import Root from '../../components/templates/root'

export default class RootContainer extends Component {
	render() {
		return (
			<Root>{ this.props.children }</Root>
		)
	}
}
