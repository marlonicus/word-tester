import {
	BrowserRouter as Router,
	Route,
	browserHistory,
} from 'react-router-dom'

import { Provider } from 'mobx-react'
import RootContainer from './containers/root'
import DonateContainer from './containers/donate'
import QuizContainer from './containers/quiz'
import QuizStore from './stores/quiz'

const containerNode = document.getElementById(`container`)
const quizStore = new QuizStore()

const appRender = (
	<Provider quizStore={quizStore}>
		<Router>
			<RootContainer>
				<Route exact path="/" component={QuizContainer} />
				<Route path="/donate" component={DonateContainer} />
			</RootContainer>
		</Router>
	</Provider>
)

ReactDOM.render(appRender, containerNode)
