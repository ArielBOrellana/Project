import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { persistor, store } from './redux/store.js' // Redux store and persistor for state management
import { Provider } from 'react-redux' // Provides the Redux store to the application
import { PersistGate } from 'redux-persist/integration/react' // Delays rendering until the persisted state is rehydrated

ReactDOM.createRoot(document.getElementById('root')).render(
  // Provide the Redux store to the entire app
  <Provider store={store}>
     {/* PersistGate ensures the app waits for the persisted state to load before rendering */}
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
)
