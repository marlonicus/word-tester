import { PropTypes } from 'mobx-react'
import { Component } from 'react'

import AnswerButton from '../answer-button'

import styles from './answers.scss'

export default class Answers extends Component {
	static propTypes = {
		answers: PropTypes.observableArray,
	}

	render() {
		const { answers } = this.props
		return (
			<ul className={styles.root}>
				{
					answers.map(({ text, correct }, index) => (
						<li key={`${text}${index}`} className={styles.answer}>
							<AnswerButton
								text={text}
								onClick={() => this.props.onAnswerClick({ correct })}
							/>
						</li>
					))
				}
			</ul>
		)
	}
}
