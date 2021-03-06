import React from 'react'
import ReactDOM from 'react-dom'
import { Elements } from '@stripe/react-stripe-js'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './redux/reducers'
import { CookiesProvider } from 'react-cookie'
import './index.css'
import { stripePromise } from './lib/stripe'

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </CookiesProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
