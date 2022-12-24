import React, {useEffect} from 'react'
import {Provider} from 'react-redux'
import {ContactUsScreen} from '@src/screens'
import {store} from '@src/store'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ContactUsScreen />
    </Provider>
  )
}

export default App
