import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from '@Store/storeConfig'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'

import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

import lang_en from "./translations/en/lang.json";

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'en',
  resources: {
    en: {
      lang: lang_en
    }
  },
});

root.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </Provider>
)
