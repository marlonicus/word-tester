import { Component, PropTypes } from 'react'
import { getRandomItem, shuffle } from '../utils'

import Quiz from '../components/quiz'

const POSSIBLE_ANSWERS = 4

export default class QuizContainer extends Component {
	static propTypes = {
		words: PropTypes.array,
	}

	constructor(props) {
		super(props)

		this.state = {
			testedWords: [],
			currentWord: 0,
			answers: [],
			score: 0,
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.words && !prevProps.words) {
			this.setRandomWord()
		}
	}

	setRandomWord() {
		const randomItem = getRandomItem(this.props.words)

		this.setState({
			currentWord: randomItem.value,
			testedWords: [
				...this.state.testedWords,
				randomItem.index,
			],
			answers: shuffle(this.getAnswers({
				correctAnswer: randomItem.value.translated,
			})),
		})
	}

	getAnswers({ correctAnswer }) {
		return Array.from(Array(POSSIBLE_ANSWERS-1)).map(() => {
			return {
				text: getRandomItem(this.props.words).value.translated,
			}
		}).concat([{
			text: correctAnswer,
			correct: true,
		}])
	}

	onAnswerClick({ correct }) {
		const { score, currentWord } = this.state
		this.setState({
			score: correct ? score + 1 :  score,
			flash: {
				correct,
				original: currentWord.original,
				translated: currentWord.translated,
			}
		})

		this.setRandomWord()
	}

	render() {
		return (
			<Quiz
				flash={this.state.flash}
				onAnswerClick={({ correct }) => this.onAnswerClick({ correct })}
				question={this.state.currentWord.original}
				answers={this.state.answers}
				score={this.state.score}
				answered={this.state.testedWords.length-1}
			/>
		)
	}
}
