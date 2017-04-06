import { Component } from 'react'
import { parseTsv } from '../utils'

import QuizContainer from '../containers/quiz'
import Root from '../components/root'
import Loading from '../components/loading'

const WORDS_URL = `https://raw.githubusercontent.com/adatlaborhu/learnlanguages/master/swedish.tsv`

export default class RootContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			questions: [],
			loading: true,
			loadingAnimationComplete: false,
		}
	}

	componentDidMount() {
		fetch(WORDS_URL)
			.then(data => data.text().then(txt => {
				this.setState({
					loading: false,
					words: parseTsv(txt),
				})
			}))
			.catch(err => { throw new Error(err) })
	}

	onLoadingAnimationComplete() {
		this.setState({
			loadingAnimationComplete: true,
		})
	}

	render() {
		const { loading, loadingAnimationComplete, words } = this.state

		return (
			<Root>
				{
					loading || !loadingAnimationComplete ?
						<Loading
							finishedLoading={!loading}
							onLoadingAnimationComplete={() => this.onLoadingAnimationComplete()}/> :
						<QuizContainer words={words} />
				}
			</Root>
		)
	}
}
