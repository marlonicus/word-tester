import { observable, computed, action, when } from 'mobx'

export default class AnimationModel {
	@observable shouldStart = false
	@observable hasStarted = false
	@observable hasFinished = false
	@observable shouldFinish = false
	@observable isQueuingFinish = false
	queuedFinishTime = 0

	constructor() {
		when(
			() => this.isQueuingFinish && this.hasStarted,
			() => this.finish(this.queuedFinishTime)
		)
	}

	@computed get isComplete() {
		return this.hasFinished
	}

	@computed get shouldShowElement() {
		return this.shouldStart && !this.shouldFinish
	}

	@action start(entryTime) {
		this.shouldStart = true
		setTimeout(() => this.onStartComplete(), entryTime)
	}

	@action onStartComplete() {
		this.hasStarted = true
	}

	@action finish(finishTime) {
		if (!this.hasStarted) {
			this.isQueuingFinish = true
			this.queuedFinishTime = finishTime
			return false
		}

		this.shouldFinish = true
		setTimeout(() => this.onFinishComplete(), finishTime)
	}

	@action onFinishComplete() {
		this.hasFinished = true
	}
}
