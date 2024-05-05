import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/authContext.jsx'
import { ThemContextProvider } from './pages/Theme/themeContext.jsx'
import { SocketContextProvider } from './context/socketContext.jsx'
import { NextUIProvider } from '@nextui-org/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ThemContextProvider>
          <SocketContextProvider>
            <NextUIProvider>
              <App />
            </NextUIProvider>
          </SocketContextProvider>
        </ThemContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

