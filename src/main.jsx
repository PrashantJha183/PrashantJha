import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { registerSW } from "virtual:pwa-register";
import { HelmetProvider } from "react-helmet-async";


registerSW({
  onNeedRefresh() {
    console.log("New content available, refresh!");
  },
  onOfflineReady() {
    console.log("App ready to work offline");
  }
});



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
