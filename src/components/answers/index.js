import { Component, PropTypes } from 'react'

import AnswerButton from '../answer-button'

import styles from './answers.scss'

export default class Answers extends Component {
	static propTypes = {
		answers: PropTypes.array,
	}

	getAnswerButton({ text, correct, index }) {
		return (
			<li key={index} className={styles.answer}>
				<AnswerButton
					text={text}
					onClick={() => this.props.onAnswerClick({ correct })}
				/>
			</li>
		)
	}

	renderAnswerButtons({ answers }) {
		return answers.map(({ text, correct }, index) => this.getAnswerButton({ text, correct, index }))
	}

	render() {
		const { answers } = this.props
		return (
			<ul className={styles.root}>
				{ this.renderAnswerButtons({ answers }) }
			</ul>
		)
	}
}
