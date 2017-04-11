import { observable, computed } from 'mobx'
import AnimationModel from '../../models/animation'

export default class QuizUIStore {
	@observable loadingAnimation = new AnimationModel()

	constructor(store) {
		this.store = store
	}

	@computed get showLoadingScreen() {
		return this.store.isLoading || !this.loadingAnimation.isComplete
	}
}
