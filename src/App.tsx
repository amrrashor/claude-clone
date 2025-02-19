import { Provider } from 'react-redux'
import store from './store/configureStore'

import './App.css'
import { Suspense } from 'react'


function App() {

  return (
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <div>App Routes</div>
      </Suspense>
    </Provider>
  )
}

export default App
