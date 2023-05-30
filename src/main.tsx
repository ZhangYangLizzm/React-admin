
import ReactDOM from 'react-dom/client'
import 'react-router-dom'
import App from './App'
import './index.less'
import store from './store/store'
import { Provider } from 'react-redux'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
