import { observable } from 'mobx'

export const SCREEN_LOADING = `screenLoading`

export default class ViewStore {
	@observable screen = SCREEN_LOADING

	loadingAnimationComplete = false
}
