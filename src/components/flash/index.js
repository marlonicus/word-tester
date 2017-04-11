import { observer } from 'mobx-react'
import { Component, PropTypes } from 'react'
import classNames from 'classnames'

import styles from './flash.scss'

@observer
export default class Flash extends Component {
	render() {
		const { lastQuestion, showFlash, hideFlash } = this.props
		const { correct, word } = lastQuestion

		const rootClasses = {
			[styles.correct]: correct,
			[styles.incorrect]: !correct,
			[styles.show]: showFlash,
		}

		return (
			<aside className={classNames(rootClasses)} onClick={hideFlash}>
				<h1 className={styles.title}>{ correct ? `Ja!` : `Nej...` }</h1>
				<p className={styles.body}>'{ word.original }' means '{ word.translated }'</p>
			</aside>
		)
	}
}
