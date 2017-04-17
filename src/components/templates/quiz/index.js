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
		this.props.store.setNewQuestion()
	}

	render() {
		const { store } = this.props
		const { question, answers, score, showFlash, lastQuestion, testedWords, hideFlash } = store

		return (
			<section className={styles.root}>
				<Flash showFlash={showFlash} lastQuestion={lastQuestion} hideFlash={() => store.hideFlash()} />
				<Question text={question} />
				<Answers answers={answers} onAnswerClick={({correct}) => this.onAnswerClick({correct})} />
				<Score correct={score} answered={testedWords.length} />
			</section>
		)
	}
}
