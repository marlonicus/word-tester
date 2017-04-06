import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Component, PropTypes } from 'react'

import styles from './loading.scss'

export default class Loading extends Component {
	static propTypes = {
		finishedLoading: PropTypes.bool,
		onLoadingAnimationComplete: PropTypes.func,
	}

	constructor(props) {
		super(props)

		this.state = {
			shownEntryAnimation: false,
			shouldShowExitAnimation: false,
		}
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				shownEntryAnimation: true,
			})
		}, 700)
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.finishedLoading && this.props.finishedLoading) {
			this.setState({
				shouldShowExitAnimation: true,
			})
		}

		if (this.state.shouldShowExitAnimation && this.state.shownEntryAnimation) {
			this.setState({
				shouldShowExitAnimation: false,
			})

			setTimeout(() => {
				this.props.onLoadingAnimationComplete()
			}, 600)
		}
	}

	render() {
		const { shownEntryAnimation } = this.state
		const { finishedLoading } = this.props
		return (
			<ReactCSSTransitionGroup
				transitionName={`loading`}
				transitionLeave={true}
				transitionAppear={true}
				transitionLeaveTimeout={650}
				transitionAppearTimeout={600}
				transitionEnterTimeout={600}
				className={styles.root}>
				{ !finishedLoading || !shownEntryAnimation ? <h1 className={styles.title}>Loading</h1> : null }
			</ReactCSSTransitionGroup>
		)
	}
}
