import { Component } from 'react'
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

export default class RootContainer extends Component {
	render() {
		// TODO: Wrap with transition runner

		return (
			<ReactCSSTransitionGroup
				transitionName="foo"
				transitionEnterTimeout={1}
				transitionLeaveTimeout={1}>
				{ this.props.children }
			</ReactCSSTransitionGroup>
		)
	}
}
