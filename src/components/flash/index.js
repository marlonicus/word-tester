import { Component, PropTypes } from 'react'
import classNames from 'classnames'

import styles from './flash.scss'

export default class Flash extends Component {
	static propTypes = {
		correct: PropTypes.bool,
		original: PropTypes.string,
		translated: PropTypes.string,
	}

	constructor(props) {
		super(props)
		this.state = {
			show: false,
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.original !== this.props.original) {
			this.setState({
				show: true,
			})

			clearTimeout(this.timeout)
			this.timeout = setTimeout(() => {
				this.setState({
					show: false,
				})
			}, 3000)
		}
	}

	render() {
		const { correct, original, translated } = this.props
		const { show } = this.state

		const rootClasses = {
			[styles.correct]: correct,
			[styles.incorrect]: !correct,
			[styles.show]: show,
		}

		return (
			<aside className={classNames(rootClasses)}>
				<h1 className={styles.title}>{ correct ? `Ja!` : `Nej...` }</h1>
				<p className={styles.body}>'{ original }' means '{ translated }'</p>
			</aside>
		)
	}
}
