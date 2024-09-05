import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'
import {Provider} from 'react-redux'
import store from './utils/Store.jsx'

const PUBLISHABLE_KEY ="pk_test_c3VwZXJiLWZyb2ctNjMuY2xlcmsuYWNjb3VudHMuZGV2JA"

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
  }

createRoot(document.getElementById('root')).render(
 
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
 <Provider store={store}>
    <App />
    </Provider>
    </ClerkProvider>

 
)
