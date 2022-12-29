import '../styles/globals.css'
import Layout from '../components/layout/layout'
import { createContext, useReducer } from 'react'
import { PANELS } from '../helpers/constants'

export const PanelContext = createContext()

const initialState = PANELS[0]
function reducer(state, action) {
  return action.payload
}

function MyApp({ Component, pageProps }) {
  const [panel, dispatch] = useReducer(reducer, initialState)
  return (
    <PanelContext.Provider value={{ panelState: panel, panelDispatch: dispatch }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PanelContext.Provider>
  )
}

export default MyApp
