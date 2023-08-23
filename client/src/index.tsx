import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import storeConfig from '@Store/storeConfig'
import { PersistGate } from 'redux-persist/integration/react'

import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'

import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'

import lang_en from './translations/en/lang.json'

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

// Multi Language Configuration
i18next.init({
  interpolation: { escapeValue: false },
  lng: 'en',
  resources: {
    en: {
      lang: lang_en,
    },
  },
})

const { persistor, store } = storeConfig();

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </PersistGate>
  </Provider>
)
