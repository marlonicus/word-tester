import { Component, PropTypes } from 'react'

import Answers from '../answers'
import Question from '../question'
import Score from '../score'
import Flash from '../flash'

import styles from './quiz.scss'

export default class Quiz extends Component {
	static propTypes = {
		answered: PropTypes.number,
		answers: PropTypes.array,
		onAnswerClick: PropTypes.func,
		question: PropTypes.string,
		score: PropTypes.number,
		flash: PropTypes.shape({
			correct: PropTypes.bool,
			original: PropTypes.string,
			translated: PropTypes.string,
		}),
	}

	render() {
		const { answers, question, score, answered, onAnswerClick, flash } = this.props

		return (
			<section className={styles.root}>
				<Flash {...flash} />
				<Question text={question} />
				<Answers answers={answers} onAnswerClick={onAnswerClick} />
				<Score correct={score} answered={answered} />
			</section>
		)
	}
}
