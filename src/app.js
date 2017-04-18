import {
	MemoryRouter as Router,
	browserHistory,
	Route,
} from 'react-router-dom'

require('./styles/main.scss')
import { AppContainer } from 'react-hot-loader'

import { Provider } from 'mobx-react'
import RootContainer from './containers/root'
import AboutContainer from './containers/about'
import QuizContainer from './containers/quiz'

export default function({ quizStore }) {
	return (
		<AppContainer>
			<Provider quizStore={quizStore}>
				<Router>
					<RootContainer>
						<Route exact path="/" component={QuizContainer} />
						<Route path="/about" component={AboutContainer} />
					</RootContainer>
				</Router>
			</Provider>
		</AppContainer>
	)
}
