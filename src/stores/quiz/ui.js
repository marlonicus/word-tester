import { observable, computed } from 'mobx'
import AnimationModel from '../../models/animation'

export default class QuizUIStore {
	SCREEN_LOADING = `screenLoading`
	SCREEN_QUIZ = `screnQuiz`

	@observable loadingAnimation = new AnimationModel()

	constructor(store) {
		this.store = store
	}

	@computed get screen() {
		if (this.shouldShowLoadingScreen) {
			return this.SCREEN_LOADING
		}
		else {
			return this.SCREEN_QUIZ
		}
	}

	@computed get shouldShowLoadingScreen() {
		return this.store.isLoading || !this.loadingAnimation.isComplete
	}
}
