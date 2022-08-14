import './index.scss';
import 'react-toastify/ReactToastify.min.css';
import React, { StrictMode } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import store, { persistor } from './app/store';
import App from './app/App';

const stripePromise = loadStripe(process.env.STRIPE_PUBLISH_KEY as string);

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <PersistGate loading={null} persistor={persistor}>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </PersistGate>
    </Provider>
  </StrictMode>,
  document.querySelector('#root'),
);
