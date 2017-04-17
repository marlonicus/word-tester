import { Component, PropTypes } from 'react'

import styles from './score.scss'

export default class Score extends Component {
	static propTypes = {
		correct: PropTypes.number,
		answered: PropTypes.number,
	}

	render() {
		const { correct, answered } = this.props
		return (
			<p className={styles.root}>Score: { correct } / { answered }</p>
		)
	}
}
