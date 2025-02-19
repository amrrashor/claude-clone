import { Suspense } from 'react'
import { Provider } from 'react-redux'
import store from './store/configureStore'

import './App.css'
import AppRoutes from './routes/AppRoutes'



function App() {

  return (
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <AppRoutes />
      </Suspense>
    </Provider>
  )
}

export default App
