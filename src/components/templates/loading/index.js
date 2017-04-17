import { observer } from 'mobx-react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { Component, PropTypes } from 'react'

import styles from './loading.scss'

@observer
export default class Loading extends Component {
	componentWillMount() {
		this.props.animationState.start(550)
	}

	componentDidUpdate(prevProps) {
		if (prevProps.isLoading && !this.props.isLoading) {
			this.props.animationState.finish(350)
		}
	}

	render() {
		const { animationState } = this.props

		return (
			<CSSTransitionGroup
				transitionName={`loading`}
				transitionLeave={true}
				transitionAppear={true}
				transitionLeaveTimeout={350}
				transitionAppearTimeout={550}
				transitionEnter={false}
				className={styles.root}>
				{ animationState.shouldShowElement ? <h1 className={styles.title}>Loading</h1> : null }
			</CSSTransitionGroup>
		)
	}
}
