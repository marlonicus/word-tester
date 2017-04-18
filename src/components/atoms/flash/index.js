import { observer } from 'mobx-react'
import { Component, PropTypes } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import classNames from 'classnames'

import styles from './flash.scss'

@observer
export default class Flash extends Component {
	renderFlashMessage({ correct, word }) {
		const rootClasses = {
			[styles.correct]: correct,
			[styles.incorrect]: !correct,
		}

		return (
			<aside
				className={classNames(rootClasses)}
				key={`${word.original}${word.translated}${correct}`}>
				<h1 className={styles.title}>{ correct ? `Ja` : `Nej`}</h1>
				<p className={styles.body}>'{word.original}' means '{word.translated}'</p>
			</aside>
		)
	}

	render() {
		const { lastQuestion, showFlash, onClick = ()=>{} } = this.props
		const { correct, word } = lastQuestion

		return (
			<CSSTransitionGroup
				transitionName={`flash`}
				transitionLeave={true}
				transitionAppear={true}
				transitionLeaveTimeout={550}
				transitionAppearTimeout={550}
				transitionEnter={true}
				transitionEnterTimeout={550}
				onClick={onClick}>
				{ showFlash ? this.renderFlashMessage({ correct, word }) : null }
			</CSSTransitionGroup>
		)
	}
}
