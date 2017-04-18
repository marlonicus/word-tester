import { observer } from 'mobx-react'
import { Component, PropTypes } from 'react'

import Answers from '../../molecules/answers'
import Question from '../../atoms/question'
import Score from '../../atoms/score'
import Flash from '../../atoms/flash'

import styles from './quiz.scss'

@observer
export default class Quiz extends Component {

	componentWillMount() {
		this.props.store.setNewQuestion()
	}

	onAnswerClick({correct}) {
		this.props.store.setAnswer({ correct })
	}

	onFlashClick() {
		this.props.store.hideFlash()
		this.props.store.setNewQuestion()
	}

	render() {
		const { store } = this.props
		const { question, answers, score, lastQuestion, testedWords, hideFlash, ui } = store

		return (
			<section className={styles.root}>
				<Flash showFlash={ui.shouldShowFlash} lastQuestion={lastQuestion} onClick={() => this.onFlashClick()} />
				<Question text={question} />
				<Answers answers={answers} onAnswerClick={({correct}) => this.onAnswerClick({correct})} />
				<Score correct={score} answered={testedWords.length} />
			</section>
		)
	}
}
