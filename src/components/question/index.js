import { Component, PropTypes } from 'react'

import styles from './question.scss'

export default class Question extends Component {
	static propTypes = {
		text: PropTypes.string,
	}

	render() {
		return (
			<h1 className={styles.root}>{ this.props.text }</h1>
		)
	}
}
