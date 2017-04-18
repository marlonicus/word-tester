import { PropTypes } from 'mobx-react'
import { Component } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import AnswerButton from '../../atoms/answer-button'

import styles from './answers.scss'

export default class Answers extends Component {
	static propTypes = {
		answers: PropTypes.observableArray,
	}

	render() {
		const { answers } = this.props
		return (
			<CSSTransitionGroup
				transitionName={`answers`}
				className={styles.root}
				component={`ul`}
				transitionAppear={true}
				transitionLeaveTimeout={550}
				transitionAppearTimeout={550}
				transitionEnter={false}>
				{
					answers.map(({ text, correct }, index) => (
						<li key={`${text}${index}`} className={styles.answer}>
							<AnswerButton
								text={text}
								onClick={() => this.props.onAnswerClick({ correct })}
							/>
						</li>
					))
				}
			</CSSTransitionGroup>
		)
	}
}
