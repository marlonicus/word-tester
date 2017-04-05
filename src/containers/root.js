import { Component } from 'react'
import { parseTsv } from '../utils'

import Root from '../components/root'
import QuizContainer from '../containers/quiz'

const WORDS_URL = `https://raw.githubusercontent.com/adatlaborhu/learnlanguages/master/swedish.tsv`

export default class RootContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			questions: [],
			loading: true,
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

	render() {
		return (
			<Root>
				{ this.loading ? <h1>Loading</h1> : <QuizContainer words={this.state.words} /> }
			</Root>
		)
	}
}
