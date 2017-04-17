import { Link } from 'react-router-dom'
import { Component } from 'react'
import { observer, inject } from 'mobx-react'

import Loading from '../../components/templates/loading'
import Quiz from '../../components/templates/quiz'

@inject(`quizStore`)
@observer
export default class QuizContainer extends Component {
	constructor(props) {
		super(props)

		const { quizStore } = props
		quizStore.loadWords()
	}

	render() {
		const { quizStore } = this.props
		const uiStore = quizStore.ui
		const { SCREEN_LOADING, SCREEN_QUIZ } = uiStore

		switch (uiStore.screen) {
			case SCREEN_LOADING:
				return (
					<Loading
						animationState={uiStore.loadingAnimation}
						isLoading={quizStore.isLoading} />
				)
			case SCREEN_QUIZ:
				return (
					<Quiz
						store={quizStore}
						viewStore={quizStore.ui} />
				)
		}
	}
}
