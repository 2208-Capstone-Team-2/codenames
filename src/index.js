import React from 'react';
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';

/* Import and destructure main from src/component/index.js 
and anything else you may need here */


const container = document.getElementById("root")
const root = createRoot(container)

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
