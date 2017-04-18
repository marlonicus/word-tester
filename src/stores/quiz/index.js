import { observable, computed, action } from 'mobx'
import { parseTsv, getRandomItem, shuffle } from '../../utils'

import UIStore from './ui'

const WORDS_URL = `https://raw.githubusercontent.com/adatlaborhu/learnlanguages/master/swedish.tsv`
const NUM_ANSWERS = 4

export default class QuizStore {
	@observable ui
	@observable words = []
	@observable currentWord = {}
	@observable testedWords = []
	@observable answers = []
	@observable score = 0
	@observable isLoading = true

	constructor() {
		this.ui = new UIStore(this)
	}

	@action setNewQuestion() {
		const randomItem = getRandomItem(this.words)
		this.currentWord = randomItem.value
		this.answers = shuffle(this.getRandomAnswers().concat([this.currentAnswer]))
	}

	@action setAnswer({ correct }) {
		this.testedWords.push({
			correct,
			word: this.currentWord,
		})

		this.showFlash()
		this.score += correct ? 1 : 0
	}

	@action hideFlash() {
		this.ui.shouldShowFlash = false
	}

	@action showFlash() {
		this.ui.shouldShowFlash = true
	}

	@computed get question() {
		return this.currentWord.original
	}

	@computed get lastQuestion() {
		if (this.testedWords.length) {
			return this.testedWords[this.testedWords.length - 1]
		}
		else {
			return {
				word: {}
			}
		}
	}

	@computed get currentAnswer() {
		return {
			correct: true,
			text: this.currentWord.translated,
		}
	}

	loadWords() {
		fetch(WORDS_URL)
			.then(data => data.text().then(txt => {
				this.words = parseTsv(txt)
				this.isLoading = false
			}))
			.catch(err => { throw new Error(err) })
	}

	getRandomAnswers({ count } = { count: NUM_ANSWERS }) {
		return Array.from(Array(count-1)).map(() => this.getRandomAnswer())
	}

	getRandomAnswer() {
		return {
			text: getRandomItem(this.words).value.translated,
		}
	}
}
