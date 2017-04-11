import { Link } from 'react-router-dom'
import { Component } from 'react'
import { observer, inject } from 'mobx-react'

import Loading from '../../components/loading'

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

		if (uiStore.showLoadingScreen) {
			return (
				<Loading
					animationState={uiStore.loadingAnimation}
					isLoading={quizStore.isLoading} />
			)
		} else {
			return <h1>Loaded!</h1>
		}
	}
}
