import { Component, PropTypes } from 'react'

import styles from './answer-button.scss'

export default class AnswerButton extends Component {
	static propTypes = {
		text: PropTypes.string,
	}

	render() {
		return (
			<button className={styles.root} onClick={ () => this.props.onClick() }>
				{ this.props.text }
			</button>
		)
	}
}
